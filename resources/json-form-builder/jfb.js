var jfb;

(function() {

	// --------------------------------------------------------------------------
	// PRIVATE METHODS
	// --------------------------------------------------------------------------
	function JSONfind(obj, key, value ) {
		var me = this;
		if (obj[key] === value) return obj[key];

		for (all in obj) {
			if (obj[all] != null && obj[all][key] === value) {
				return obj[all];
			}

			if (typeof obj[all] == "object" && obj[all]!= null) {
				var found = JSONfind(obj[all], key, value );
				if (found) return found;
			}
		}
	};

	function DateFmt(fstr, mthNames, dayNames) {
		this.formatString = fstr;

		var mthNames = mthNames || ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
		var dayNames = dayNames || ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		var zeroPad = function(number) {
			 return ("0"+number).substr(-2,2);
		}

		var dateMarkers = {
			d:['getDate',function(v) { return zeroPad(v)}],
			m:['getMonth',function(v) { return zeroPad(v+1)}],
			n:['getMonth',function(v) { return mthNames[v]; }],
			w:['getDay',function(v) { return dayNames[v]; }],
			y:['getFullYear'],
			H:['getHours',function(v) { return zeroPad(v)}],
			M:['getMinutes',function(v) { return zeroPad(v)}],
			S:['getSeconds',function(v) { return zeroPad(v)}],
			i:['toISOString']
		};

		this.format = function(date) {
			var dateTxt = this.formatString.replace(/%(.)/g, function(m, p) {
				var rv = date[(dateMarkers[p])[0]]();

				if (dateMarkers[p][1] != null) {
					rv = dateMarkers[p][1](rv);
				}

				return rv;
			});

			return dateTxt;
		}
	};

	function getFormDefinition(cb) {
		if (typeof cb != "function") {
			return;
		}

		jfb.data = json;

		cb(json);
	};

	function handleSubmit(context) {
		context.$wrapper.closest('form').on('submit', function(e) {
			e.preventDefault();

			var result = context.getStringifiedData();

			if (result != "error") {
				$.post('', {
					data : result
				}, function(data) {
					if (!data || data == "") {
						alert('Ocurrió un problema al enviar su solicitud.');
					} else {
						$('.jfb-form').html('');
						context.init();

						alert('Se envió correctamente la solicitud, con código: '+ data);
					}
				});
			}
		});
	}

	function appendFormTitle(formDefinition) {
		if (formDefinition.title) {
			var $h1 = $('<h1>');

			$h1.addClass('jfb-form-title');
			$h1.text(formDefinition.title);

			jfb.$wrapper.append($h1);
		}
	};

	function createForm(formDefinition) {
		$.each(formDefinition.containers, function(index, container) {
			appendContainer(container);
		});
	};

	function appendContainer(container) {
		var $container = $('<div>').addClass('jfb-container');
		var $containerTitle = $('<h2>');

		$containerTitle.addClass('jfb-container-title');
		$containerTitle.text(container.title);

		$container.append($containerTitle);

		$.each(container.rows, function(index, row) {
			var $row = getRow(row);
			$container.append($row);
		});

		jfb.$wrapper.append($container);
	};

	function getRow(row) {
		var $row = $('<div>').addClass('jfb-row');

		$.each(row.items, function(index, item) {
			var $item = getItemObject(item);
			$row.append($item);
		});

		return $row;
	};

	function getItemObject(item) {
		var $item;
		var textfieldMatch = item.type.match(/^(text|date|datetime|time|email|number|tel)$/);

		switch(true) {
			case textfieldMatch && textfieldMatch.length > 0:
				$item = getTextField(item);
				break;

			case item.type == "select":
				$item = getSelectFieldFor(item);
				break;

			case item.type == "textarea":
				$item = getTextareaFieldFor(item);
				break;

			case item.type == "checkbox":
				$item = getCheckboxFieldFor(item);
				break;

			case item.type == "radio":
				$item = getRadioFieldFor(item);
				break;

			case item.type == "todayText":
				$item = getTodayTextFieldFor(item);
				break;

			case item.type == "link":
				$item = getLinkFieldFor(item);
				break;
		}

		return $item;
	};

	function getTodayTextFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var fmt = new DateFmt(item.format || "%d/%m/%y", item.monthNames, item.dayNames);
		var $item = $('<div>').text(fmt.format(new Date()));

		$item.addClass('jfb-item jfb-item-today-text');
		$item.attr('id', getItemId(item));

		$wrapper.append($item);

		return $wrapper;
	};

	function getLinkFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var $item = $('<a>')
			.text(item.text)
			.attr('target', '_blank')
			.attr('href', item.href);

		$item.addClass('jfb-item jfb-item-link');
		$item.attr('id', getItemId(item));

		$wrapper.append($item);

		return $wrapper;
	}

	function getSelectFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var $item = $('<select />');
		var values = getItemValues(item);

		$item.addClass('jfb-item jfb-item-select');
		$item.attr('id', getItemId(item));

		$.each(values, function(index, val) {
			$item.append($('<option />').text(val));
		});

		if (item.update) {
			handleNestedItems($item, item);
		}

		handleDisabled($item, item);

		$wrapper.append($item);

		return $wrapper;
	};

	function handleNestedItems($item, itemData) {
		$item.on('change', function() {
			updateNestedItems($item, itemData);
		});
	}

	function updateNestedItems($item, itemData) {
		var selectedValue = $item.val();
		var targetItem = JSONfind(json, "key", itemData.update);
		var $targetItem = $('#jfb-item-'+ itemData.update);
		var values = getItemValues(targetItem, selectedValue);

		fillSelectItem($targetItem, values);

		$targetItem.trigger('change');
	}

	function fillSelectItem($targetItem, data) {
		clearSelectItem($targetItem);

		$.each(data, function(i, val) {
			$targetItem.append($('<option />').text(val));
		});
	}

	function clearSelectItem($select) {
		$select.find('option').remove();
	}

	function getCheckboxFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var id = getItemId(item);

		$wrapper.attr('id', id);

		appendItemValues($wrapper, item);

		return $wrapper;
	};

	function getRadioFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var id = getItemId(item);

		$wrapper.attr('id', id);

		appendItemValues($wrapper, item);

		return $wrapper;
	};

	function getTextField(item) {
		var type = item.type;
		var $wrapper = getWrapperFor(item);
		var $item = $('<input type="'+ type +'" />');

		$item.addClass('jfb-item jfb-item-type-textfield jfb-item-'+ type);
		$item.attr('id', getItemId(item));
		$item.attr('placeholder', getItemPlaceHolder(item));
		$item.attr('value', getItemValue(item));

		handleDisabled($item, item);

		$wrapper.append($item);

		return $wrapper;
	};

	function getTextareaFieldFor(item) {
		var $wrapper = getWrapperFor(item);
		var $item = $('<textarea />');

		$item.addClass('jfb-item jfb-item-type-textfield jfb-item-textarea');
		$item.attr('id', getItemId(item));
		$item.attr('placeholder', getItemPlaceHolder(item));
		$item.css('height', getItemHeight(item));

		handleDisabled($item, item);

		$wrapper.append($item);

		return $wrapper;
	};

	function getWrapperFor(item) {
		var $wrapper = $('<p>').addClass('jfb-item-wrapper jfb-item-type-'+ item.type);

		$wrapper.attr('data-jfb-id', item.key);
		$wrapper.css('width', getItemWidth(item));

		if (item.label && item.label != '') {
			$wrapper.append(getItemLabel(item));
		}

		return $wrapper;
	};

	function getItemLabel(item) {
		if (item.type == "checkbox") {
			var $label = $('<span>');

			$label.addClass('label').text(item.label);

			return $label;
		}

		var $label = $('<label>');

		$label.attr('for', getItemId(item));
		$label.text(item.label);

		if (item.required) {
			$label.append('<span class="required"> (*)</span>');
		}

		return $label;
	};

	function getItemValues(item, parentValue) {
		var values;

		if (typeof item.list != "undefined") {
			var values = jfb.data.lists[item.list];
		}

		// Deprecated on 1.0.9
		if (typeof item.refValues != "undefined") {
			var values = jfb.data.lists[item.refValues];
		}

		if (typeof item.nestedList != "undefined") {
			var values = jfb.data.nestedLists[item.nestedList];
		}

		if (typeof item.values != "undefined") {
			var values = item.values;
		}

		if (values instanceof Array) {

		} else {
			if (parentValue) {
				values = values[parentValue];
			} else {
				for (first in values) break;
				values = values[first];
			}
		}

		return values;
	};

	function appendItemValues($wrapper, item) {
		var itemType = item.type;
		var values = getItemValues(item);
		var id = getItemId(item);

		$.each(values, function(index, val) {
			var $item_wrapper = $('<span>').addClass('jfb-item-'+ itemType +'-wrapper');
			var $label = $('<label>');
			var $item = $('<input type="'+ itemType +'" />');
			var item_id = id +'_'+ index;

			$label.attr('for', item_id);
			$label.text(val);

			$item.addClass('jfb-item jfb-item-'+ itemType);
			$item.attr('name', id);
			$item.attr('id', item_id);
			$item.val(val);

			handleDisabled($item, item);

			$item_wrapper.append($item);
			$item_wrapper.append($label);
			$wrapper.append($item_wrapper);
		});
	}

	function getItemWidth(item) {
		return item.size +'%' || 'auto';
	};

	function getItemId(item) {
		return 'jfb-item-'+ item.key;
	};

	function getItemPlaceHolder(item) {
		return item.placeHolder || '';
	};

	function getItemValue(item) {
		return item.value || '';
	};

	function getItemHeight(item) {
		return (item.height || 100) +'px';
	};

	function handleDisabled($item, item) {
		if (item.disabled) {
			$item.attr('disabled', 'disabled');
		}
	}

	function handleItemData($wrapper) {
		var $errorMessage = $wrapper.find('.jfb-error-message');
		var itemId = $wrapper.data('jfb-id');
		var obj = JSONfind(jfb.data, 'key', itemId);
		var error = false;
		var errorMessage;

		// GET VALUE
		// ---------

		// Default
		obj['value'] = $wrapper.find('.jfb-item').val();

		// Input type: checkbox
		if (obj.type == "checkbox") {
			obj.value = "";

			$wrapper.find('.jfb-item:checked').each(function(index, item) {
				if (index > 0) {
					obj.value += ' | ';
				}

				obj.value += $(item).val();
			});
		}

		// Input type: radio
		if (obj.type == "radio") {
			obj.value = $wrapper.find('.jfb-item:checked').val() || "";
		}

		// Today text
		if (obj.type == "todayText") {
			obj.value = $wrapper.find('.jfb-item').text();
		}

		// VALIDATIONS
		// -----------

		// Validation: required
		if (obj.required) {
			if (!obj.value || obj.value == "") {
				errorMessage = "El campo es obligatorio";
			}
		}

		if (obj.match) {
			var $target = $('#jfb-item-'+ obj.match);
			var $label = $target.closest('.jfb-item-wrapper').find('label');
			if (obj.value != $target.val()) {
				errorMessage = "Debe tener el mismo valor que el campo '"+ $label.text() +"'";
			}
		}

		// Min length
		if (obj.minLength && obj.value.length > 0) {
			if (obj.value.length < obj.minLength) {
				errorMessage = "Debe contener al menos "+ obj.minLength +" caracteres";
			}
		}

		// Max length
		if (obj.maxLength) {
			if (obj.value.length > obj.maxLength) {
				errorMessage = "Debe contener como máximo  "+ obj.maxLength +" caracteres";
			}
		}

		// Validation: custom
		if (obj.validation) {
			var regex = /./;

			switch(obj.validation) {
				case "email":
					regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					break;
			}

			if (obj.value && !obj.value.match(regex)) {
				errorMessage = "Debe contener un email válido";
			}
		}

		// Validation: regex
		if (obj.validationRegex) {
			var regex = new RegExp(obj.validationRegex);

			if (obj.value && !obj.value.match(regex)) {
				errorMessage = "Debe contener un valor válido";
			}
		}

		// HANDLE ERRORS
		// -------------
		if (errorMessage) {
			error = true;

			$wrapper.addClass('jfb-error');

			if ($errorMessage.length <= 0) {
				$wrapper.append('<span class="jfb-error-message">'+ errorMessage +'</span>');
			} else {
				$errorMessage.text(errorMessage);
			}
		} else {
			$wrapper
				.removeClass('jfb-error')
				.find('.jfb-error-message').remove();
		}

		return error;
	}

	function errorsPresent(context) {
		return context.$wrapper.find('.jfb-error').length > 0;
	}

	function blurFocusedElement(context) {
		context.$wrapper.find(':focus').blur();
	}

	// --------------------------------------------------------------------------
	// PUBLIC API
	// --------------------------------------------------------------------------
	jfb = {
		init : function() {
			var context = this;

			getFormDefinition(function(definition) {
				context.$wrapper = $('.jfb-form');

				appendFormTitle(definition);

				createForm(definition);
			});

			handleSubmit(context);
		},

		getStringifiedData : function() {
			var context = this;

			context.$wrapper.find('.jfb-item-wrapper').each(function(index, item) {
				handleItemData($(item));
			});

			if (errorsPresent(context)) {
				return "error";
			}

			blurFocusedElement(context);

			return JSON.stringify(context.data);
		}
	};

	// --------------------------------------------------------------------------
	// INIT
	// --------------------------------------------------------------------------
	if (typeof jQuery != "undefined") {
		jQuery(function($) {
			jfb.init();
		});
	}

})();