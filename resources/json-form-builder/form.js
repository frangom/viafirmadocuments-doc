// JSON with comments (Do not copy paste!!! JSON with comments are invalid!!!)
var json = {
	"code": "contract_1",
	"title": "Form Sample",
	"version": "0001",
	"templateCode": "sample",

	// Lists of values to be reused on the form (for example on "select" items, in the property "list")
	"lists" : {
		"combos" : ["Value 1", "Value 2", "Value 3"],
		"checkboxes" : ["Value 1", "Value 2", "Value 3"],
		"radios" : ["Value 1", "Value 2", "Value 3"],
		"nestedSample1" : ["Item 1", "Item 2", "Item 3"]
	},

	// Lists of values to be reused on the form in the case of nested selects (selects whose values depends on another item selected value)
	"nestedLists" : {
		"nestedSample2" : {
			"Item 1" : ["Item 1.1", "Item 1.2", "Item 1.3"],
			"Item 2" : ["Item 2.1", "Item 2.2", "Item 2.3"],
			"Item 3" : ["Item 3.1", "Item 3.2", "Item 3.3"]
		},
		"nestedSample3" : {
			"Item 1.1" : ["Item 1.1.1", "Item 1.1.2", "Item 1.1.3"],
			"Item 1.2" : ["Item 1.2.1", "Item 1.2.2", "Item 1.2.3"],
			"Item 1.3" : ["Item 1.3.1", "Item 1.3.2", "Item 1.3.3"],
			"Item 2.1" : ["Item 2.1.1", "Item 2.1.2", "Item 2.1.3"],
			"Item 2.2" : ["Item 2.2.1", "Item 2.2.2", "Item 2.2.3"],
			"Item 2.3" : ["Item 2.3.1", "Item 2.3.2", "Item 2.3.3"],
			"Item 3.1" : ["Item 3.1.1", "Item 3.1.2", "Item 3.1.3"],
			"Item 3.2" : ["Item 3.2.1", "Item 3.2.2", "Item 3.2.3"],
			"Item 3.3" : ["Item 3.3.1", "Item 3.3.2", "Item 3.3.3"]
		}
	},

	// Each "section" (a.k.a "separate blocks of data") on the form
	"containers": [
		{
			// Title of the container
			"title": "Elements",

			// Rows of this container
			"rows": [
				// Each item on the row
				{
					"items": [
						{
							"key": "link",
							"type": "link", // Item of type "link", will rendere a link
							"text": "This is a sample link with lorem ipsum dolor sit amet", // Link text
							"href": "http://google.com/" // Link URL
						}
					]
				},
				{
					"items": [
						{
							"key": "today", // Key (or identifier)
							"type": "todayText", // Item of type "todayText" (will render a text with today's date)

							// Format for the shown date (defaults to "%d/%m/%y")
							// Values:
							//   %d: Day
							//   %m: Month number
							//   %n: Month name
							//   %w: Day name
							//   %y: Full year
							//   %H: Hours
							//   %M: Minutes
							//   %S: Seconds
							//   %i: ISO date
							"format": "%w - %d %n %y",

							// Textual names for the months (defaults to Spanish)
							"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

							// Textual names for the week days (defaults to Spanish)
							"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
						}
					]
				},
				{
					"items": [
						{
							"key": "sampleMail",
							"type": "email",
							"label": "e-Mail",
							"placeHolder": "insert email",
							"size": "50",
							"validation": "email"
						},
						{
							"key": "sampleMail2",
							"type": "email",
							"label": "Confirm e-Mail",
							"placeHolder": "confirm email",
							"size": "50",
							"validation": "email",
							"match": "sampleMail" // Points to other item id in order to ensure that their values match
						}
					]
				},
				{
					"items" : [
						{
							"key": "nestedSelect1",
							"type": "select",
							"label": "Grandparent",
							"update": "nestedSelect2", // Points to other item id in order to refresh its data
							"list" : "nestedSample1"
						},

						{
							"key": "nestedSelect2",
							"type": "select",
							"label": "Parent",
							"update": "nestedSelect3",
							"nestedList" : "nestedSample2" // Because this is a nested item (its values depends on the value of other item) here you must put the key of the list stored on "nestedLists"
						},

						{
							"key": "nestedSelect3",
							"type": "select",
							"label": "Son",
							"nestedList" : "nestedSample3"
						}
					]
				},
				{
					"items": [
						{
							"key": "disabled",
							"type": "text",
							"label": "Disabled field",
							"placeHolder": "you can't write here",
							"size": "25",
							"disabled": true // Disable this field
						},
						{
							"key": "name", // Key (or identifier)
							"type": "text", // Item of type "text" (will render a textfield)
							"label": "Name", // Text to be used for the label of the item. If empty, no label is added
							"placeHolder": "insert name", // Text to be used as the placeholder (using HTML placeholder attribute)
							"size": "25", // Size (in percent). If not specified, will be "auto"
							"required": true // Defines if the field cannot be blank
						},
						{
							"key": "email",
							"type": "text",
							"label": "Email",
							"placeHolder": "insert email",
							"size": "25",
							"validation": "email" // Custom validation. Available values: "email"
						},
						{
							"key": "age",
							"type": "text",
							"label": "Age",
							"placeHolder": "insert age",
							"size": "25",
							"validationRegex": "[0-9]+" // Custom validation using specified regular expression
						}
					]
				},
				{
					"items": [
						{
							"key": "minlength",
							"type": "text",
							"label": "Min length",
							"placeHolder": "item with min length",
							"size": "33",
							"minLength" : "3" // Min length for the value
						},
						{
							"key": "maxlength",
							"type": "text",
							"label": "Max length",
							"placeHolder": "item with max length",
							"size": "33",
							"maxLength" : "5" // Min length for the value
						},
						{
							"key": "minandmaxlength",
							"type": "text",
							"label": "Min and max length",
							"placeHolder": "item with min and max length",
							"size": "33",
							"maxLength" : "3", // You can use both, "minLength" and "maxLength"
							"maxLength" : "5"
						}
					]
				},
				{
					"items": [
						{
							"key": "date",
							"type": "date", // Item of type "date" (will render a textfield with a calendar)
							"label": "Date",
							"placeHolder": "date",
							"size": "33"
						},
						{
							"key": "datetime",
							"type": "datetime", // Item of type "datetime" (will render a textfield with a calendar and a time selector)
							"label": "Datetime",
							"placeHolder": "date time",
							"size": "33"
						},
						{
							"key": "time",
							"type": "time", // Item of type "time" (will render a textfield with a time selector)
							"label": "Time",
							"placeHolder": "time",
							"size": "33"
						}
					]
				},
				{
					"items": [
						{
							"key": "email",
							"type": "email", // Item of type "email" (will render a textfield)
							"label": "Email",
							"placeHolder": "Insert email",
							"size": "33"
						},
						{
							"key": "number",
							"type": "number", // Item of type "number" (will render a textfield)
							"label": "Number",
							"placeHolder": "insert number",
							"size": "33"
						},
						{
							"key": "tel",
							"type": "tel", // Item of type "phone" (will render a textfield)
							"label": "Phone",
							"placeHolder": "insert phone",
							"size": "33"
						}
					]
				},
				{
					"items": [
						{
							"key": "select1",
							"type": "select", // Item of type "select" (will render a combobox)
							"label": "Select Sample",
							"list" : "combos" // The combo will be loaded with values under a key with this name on "lists" object inside the JSON
						},
						{
							"key": "radios1",
							"type": "radio", // Item of type "radio" (will render a radio list). Works the same as "select" elements.
							"label": "Radios Sample",
							"list" : "radios"
						},
						{
							"key": "checkbox1",
							"type": "checkbox", // Item of type "checkbox" (will render a checkbox list). Works the same as "select" elements. Stores an string with the selected values separated by " | " on the "value" JSON attribute for this item
							"label": "Checkboxes Sample",
							"list" : "checkboxes"
						}
					]
				},
				{
					"items": [
						{
							"key": "textarea",
							"type": "textarea", // Item of type "textarea" (will render a textarea)
							"label": "Textarea",
							"size": "100",
							"height": "120", // Height of the textarea (in pixels), defaults to 100
							"placeHolder" : "This is a textarea"
						}
					]
				}
			]
		}
	]
};

// JSON to be used (Can be copy pasted!)
var json = {
	"code": "contract_1",
	"title": "Form Sample",
	"version": "0001",
	"templateCode": "test_contract_2",
	"lists" : {
		"combos" : ["Combos - Value 1", "Combos - Value 2", "Combos - Value 3"],
		"checkboxes" : ["Checkboxes - Value 1", "Checkboxes - Value 2", "Checkboxes - Value 3"],
		"radios" : ["Radios - Value 1", "Radios - Value 2", "Radios - Value 3"],
		"nestedSample1" : ["Item 1", "Item 2", "Item 3"]
	},
	"nestedLists" : {
		"nestedSample2" : {
			"Item 1" : ["Item 1.1", "Item 1.2", "Item 1.3"],
			"Item 2" : ["Item 2.1", "Item 2.2", "Item 2.3"],
			"Item 3" : ["Item 3.1", "Item 3.2", "Item 3.3"]
		},
		"nestedSample3" : {
			"Item 1.1" : ["Item 1.1.1", "Item 1.1.2", "Item 1.1.3"],
			"Item 1.2" : ["Item 1.2.1", "Item 1.2.2", "Item 1.2.3"],
			"Item 1.3" : ["Item 1.3.1", "Item 1.3.2", "Item 1.3.3"],
			"Item 2.1" : ["Item 2.1.1", "Item 2.1.2", "Item 2.1.3"],
			"Item 2.2" : ["Item 2.2.1", "Item 2.2.2", "Item 2.2.3"],
			"Item 2.3" : ["Item 2.3.1", "Item 2.3.2", "Item 2.3.3"],
			"Item 3.1" : ["Item 3.1.1", "Item 3.1.2", "Item 3.1.3"],
			"Item 3.2" : ["Item 3.2.1", "Item 3.2.2", "Item 3.2.3"],
			"Item 3.3" : ["Item 3.3.1", "Item 3.3.2", "Item 3.3.3"]
		}
	},
	"containers": [
		{
			"name": "Page 1",
			"title": "Elements",
			"rows": [
				{
					"items": [
						{
							"key": "link",
							"type": "link",
							"text": "This is a sample link with lorem ipsum dolor sit amet",
							"href": "http://google.com/"
						}
					]
				},
				{
					"items": [
						{
							"key": "today",
							"type": "todayText",
							"format": "%w - %d %n %y",
							"monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
							"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
						}
					]
				},
				{
					"items": [
						{
							"key": "sampleMail",
							"type": "email",
							"label": "e-Mail",
							"placeHolder": "insert email",
							"size": "50",
							"validation": "email"
						},
						{
							"key": "sampleMail2",
							"type": "email",
							"label": "Confirm e-Mail",
							"placeHolder": "confirm email",
							"size": "50",
							"validation": "email",
							"match": "sampleMail"
						}
					]
				},
				{
					"items" : [
						{
							"key": "nestedSelect1",
							"type": "select",
							"label": "Grandparent",
							"update": "nestedSelect2",
							"list" : "nestedSample1"
						},

						{
							"key": "nestedSelect2",
							"type": "select",
							"label": "Parent",
							"update": "nestedSelect3",
							"nestedList" : "nestedSample2"
						},

						{
							"key": "nestedSelect3",
							"type": "select",
							"label": "Son",
							"nestedList" : "nestedSample3"
						}
					]
				},
				{
					"items": [
						{
							"key": "disabled",
							"type": "text",
							"label": "Disabled field",
							"placeHolder": "you can't write here",
							"size": "25",
							"disabled": true
						},
						{
							"key": "name",
							"type": "text",
							"label": "Name",
							"placeHolder": "insert name",
							"size": "25",
							"required": true
						},
						{
							"key": "email",
							"type": "text",
							"label": "Email",
							"placeHolder": "insert email",
							"size": "25",
							"validation": "email"
						},
						{
							"key": "age",
							"type": "text",
							"label": "Age",
							"placeHolder": "insert age",
							"size": "25",
							"validationRegex": "[0-9]+"
						}
					]
				},
				{
					"items": [
						{
							"key": "minlength",
							"type": "text",
							"label": "Min length",
							"placeHolder": "item with min length",
							"size": "33",
							"minLength" : "3"
						},
						{
							"key": "maxlength",
							"type": "text",
							"label": "Max length",
							"placeHolder": "item with max length",
							"size": "33",
							"maxLength" : "5"
						},
						{
							"key": "minandmaxlength",
							"type": "text",
							"label": "Min and max length",
							"placeHolder": "item with min and max length",
							"size": "33",
							"minLength" : "3",
							"maxLength" : "5"
						}
					]
				},
				{
					"items": [
						{
							"key": "date",
							"type": "date",
							"label": "Date",
							"placeHolder": "date",
							"size": "33"
						},
						{
							"key": "datetime",
							"type": "datetime",
							"label": "Datetime",
							"placeHolder": "date time",
							"size": "33"
						},
						{
							"key": "time",
							"type": "time",
							"label": "Time",
							"placeHolder": "time",
							"size": "33"
						}
					]
				},
				{
					"items": [
						{
							"key": "email",
							"type": "email",
							"label": "Email",
							"placeHolder": "Insert email",
							"size": "33"
						},
						{
							"key": "number",
							"type": "number",
							"label": "Number",
							"placeHolder": "insert number",
							"size": "33"
						},
						{
							"key": "tel",
							"type": "tel",
							"label": "Phone",
							"placeHolder": "insert phone",
							"size": "33"
						}
					]
				},
				{
					"items": [
						{
							"key": "select1",
							"type": "select",
							"label": "Select Sample",
							"list" : "combos"
						},
						{
							"key": "checkbox1",
							"type": "checkbox",
							"label": "Checkboxes Sample",
							"list" : "checkboxes"
						},
						{
							"key": "radios1",
							"type": "radio",
							"label": "Radios Sample",
							"list" : "radios"
						}
					]
				},
				{
					"items": [
						{
							"key": "textarea",
							"type": "textarea",
							"label": "Textarea",
							"size": "100",
							"height": "120",
							"placeHolder" : "This is a textarea"
						}
					]
				}
			]
		}
	]
};