## Lista de parámetros disponibles

#### APPLICATION_URL
**Disponible desde:** 1.0

URL de acceso público a la plataforma por ejemplo: http://dev.viafirma.com/mobile-services

#### AUTHENTICATOR_CHAIN
**Disponible desde:** 2.0

Implementación utilizada para el control de acceso de usuarios a la plataforma, por ejemplo: com.viafirma.mobile.services.security.DatabaseAuthenticator para gestionar en acceso mediante base de datos.

#### SEUS_URL
**Disponible desde:** 2.0

URL de acceso al servicios de autenticación de usuarios Seus, este parámetro solo es necesario en el caso de que se quiera utilizar:
 AUTHENTICATOR_CHAIN=com.viafirma.mobile.services.security.SeusAuthenticator

#### PERSISTENCE_STORAGE
**Disponible desde:** 1.0

Ruta física de disco en la que se persistirán los datos almacenados en cache, documentos temporal y mensajes recibidos por la plataforma y que están actualmente en ejecución.

#### AUDITORY_PATH
**Disponible desde:** 1.0

Ruta física de disco donde se guardan los xml que que contienen los mensajes procesados por la plataforma a modo de auditoría.

#### VIAFIRMA_URL
**Disponible desde:** 1.0

URL de acceso al servidor de Viafirma Platform

#### VIAFIRMA_USER
**Disponible desde:** 1.0

Usuario de acceso a los servicios de Viafirma Platform

#### VIAFIRMA_PASS
**Disponible desde:** 1.0

Clave de acceso a los servicios de Viafirma Platform

#### VIAFIRMA_MANAGER_WS_URL
**Disponible desde:** 2.0

URL de acceso al servidor de Viafirma Manager

#### VIAFIRMA_MANAGER_WS_USER
**Disponible desde:** 2.0

Usuario de acceso a los servicios de Viafirma Manager

#### VIAFIRMA_MANAGER_WS_PASS
**Disponible desde:** 2.0

Clave de acceso a los servicios de Viafirma Manager

#### VIAFIRMA_CUSTODY_STORAGE
**Disponible desde:** 2.0

Ruta de persistencia de documentos firmados que se utilizará para las nuevas aplicaciones creadas en Viafirma Manager directamente desde Mobile Services al crear un nuevo usuario

#### MAIL_HOST_NAME
**Disponible desde:** 2.2.6

URL de acceso al servidor de envío de emails

#### MAIL_SMTP_USER
**Disponible desde:** 2.2.6

Usuario de acceso al servidor de envío de emails configurado
#### MAIL_SMTP_PASS
**Disponible desde:** 2.2.6

Clave del usuario de acceso al servidor de envío de emails configurado

#### MAIL_FROM
**Disponible desde:** 2.2.6

Dirección de correo electrónico desde la que aparecerá como remitente de los emails enviados

#### MAIL_CALLBACK_SUBJECT
**Disponible desde:** 2.2.6

Asunto de los emails enviado a las direcciones de email informadas en el parámetro callbackMails de un mensaje

#### MAIL_CALLBACK_ATTACHMENT_XML
**Disponible desde:** 2.2.6

Puede tener valores [true|false] en caso de valer true, se adjuntara el mensaje, en formato xml, resultante de la operación como adjunto al email enviado a las direcciones informadas en el parámetro callbackMails de un mensaje

#### MAIL_CALLBACK_ATTACHMENT_PDF
**Disponible desde:** 2.2.6

Puede tener valores [true|false] en caso de valer true, se adjuntara el documento resultante de la operación como adjunto al email enviado a las direcciones informadas en el parámetro callbackMails de un mensaje

#### MAIL_CALLBACK_PRINT_FORM_PARAMS
**Disponible desde:** 2.2.6

Puede tener valores [true|false] en caso de valer true, se adjuntara al contenido del email, los valores del formulario utilizado para la generación del documento, si el parámetro callbackMailsFormKeys del mensaje está informado solo se enviarán las los valores de los campos de formulario de las claves definidas en este parámetro, si el parámetro callbackMailsFormKeys no está informado, se mandarán todos los valores del formulario

#### MAIL_CALLBACK_PRINT_DISCLAIMER
**Disponible desde:** 2.2.6

Texto del disclaimer que se añadirá al contenido de los email enviados por el sistema, como resultado de la ejecución de la tarea de callback

#### REPOSITORIO_IMPL
**Disponible desde:** 1.0

Implementaciones disponibles para la persistencia de datos o documentos, plantillas, documentos firmados, datos de aplicaciones, etc.

Actualmente están disponibles las siguientes implementaciones:

> * **fileSystem**  org.hanuman.framework.external.repository.ManagerFileRepositorySimpleImpl
> * **ftp**  org.hanuman.framework.external.repository.FtpFileRepositorySimpleImpl

#### fileSystem.template.PATH_BASE
#### fileSystem.template.VERSIONAR

#### fileSystem.application.PATH_BASE
#### fileSystem.application.VERSIONAR

#### 'selected_impl'.signed.PATH_BASE
#### 'selected_impl'.signed.VERSIONAR

#### computec.external_signed.TEMPORAL_STORAGE
#### computec.external_signed.COMPUTEC_SERVICE
#### computec.external_signed.SERVICE_PATH
#### computec.external_signed.ASYNC_TRANSFER
#### computec.external_signed.TRANSFER_ASYNC_PERIOD
#### computec.external_signed.MAX_RETRY_COUNT

#### OAUTH_REQUEST_MAX_AGE
Maximum age (in milliseconds) of timestamp to accept in incoming messages.

#### CREATE_TEMPLATE_EXAMPLES

#### METADATA_CIPHER_PUBLIC_KEY
