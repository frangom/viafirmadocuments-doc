## Lista de parámetros disponibles

#### APPLICATION_URL
**Disponible desde:** 1.0

URL de acceso público a la plataforma por ejemplo: http://dev.viafirma.com/mobile-services

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

#### REPOSITORIO_IMPL
**Disponible desde:** 1.0

Implementaciones disponibles para la persistencia de datos o documentos, plantillas, documentos firmados, datos de aplicaciones, etc.

Actualmente están disponibles las siguientes implementaciones:

> * **fileSystem** -->  org.hanuman.framework.external.repository.ManagerFileRepositorySimpleImpl
> * **ftp** --> org.hanuman.framework.external.repository.FtpFileRepositorySimpleImpl
> * **computec** --> org.hanuman.framework.external.repository.ComputecFileRepositoryImpl:**computec1**

#### fileSystem.template.PATH_BASE
**Disponible desde:** 1.0

Ruta física en disco donde se persistirán las plantillas configuradas en el sistema.

#### fileSystem.template.VERSIONAR
**Disponible desde:** 1.0

Este parámetro solo puede tener el valor false

#### fileSystem.application.PATH_BASE
**Disponible desde:** 1.0

Ruta física en disco donde se persistirán los datos de las aplicaciones configuradas en el sistema.

#### fileSystem.application.VERSIONAR
**Disponible desde:** 1.0

Este parámetro solo puede tener el valor false

#### 'selected_impl'.signed.PATH_BASE
**Disponible desde:** 1.0

Ruta donde se persistirá una copia de los documentos firmados en el sistema.

Se puede reemplazar 'selected_impl' por los valores [fileSystem|ftp]

#### 'selected_impl'.signed.VERSIONAR
**Disponible desde:** 1.0

Este parámetro solo puede tener el valor false

#### AUTHENTICATOR_CHAIN
**Disponible desde:** 2.0

Implementación utilizada para el control de acceso de usuarios a la plataforma, por ejemplo: com.viafirma.mobile.services.security.DatabaseAuthenticator para gestionar en acceso mediante base de datos.

#### SEUS_URL
**Disponible desde:** 2.0

URL de acceso al servicios de autenticación de usuarios Seus, este parámetro solo es necesario en el caso de que se quiera utilizar:
 AUTHENTICATOR_CHAIN=com.viafirma.mobile.services.security.SeusAuthenticator

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

#### computec1.external_signed.TEMPORAL_STORAGE
**Disponible desde:** 2.2.6

Directorio físico de persistencia temporal de los documentos que serán transferidos al sistema externo computec
#### computec1.external_signed.COMPUTEC_SERVICE
**Disponible desde:** 2.2.6

URL de acceso al servicio de computec

#### computec1.external_signed.SERVICE_PATH
**Disponible desde:** 2.2.6

Path del servicio en el que se recibirán los documentos enviados

#### computec1.external_signed.ASYNC_TRANSFER
**Disponible desde:** 2.2.6

Puede tener valores ["true"|"false"]

#### computec1.external_signed.TRANSFER_ASYNC_PERIOD
**Disponible desde:** 2.2.6



#### computec1.external_signed.MAX_RETRY_COUNT
**Disponible desde:** 2.2.6



#### OAUTH_REQUEST_MAX_AGE
**Disponible desde:** 2.0

Número máximo de milisegundos de diferencia permitidos entre que se solicita una petición al servidor y es recibida por el servidor.

Si este parámetro no está informado o tiene el valor 0 no se realiza la comprobación

#### CREATE_TEMPLATE_EXAMPLES
**Disponible desde:** 2.2.6

Puede tener valores [true|false] en caso de valer true se instalan/actualizan de forma automática al iniciar el servidor las plantillas de ejemplo creadas para demostrar la funcionalidad del sistema

#### METADATA_CIPHER_PUBLIC_KEY
**Disponible desde:** 2.2.11

Valor de la clave pública que se utilizará para el cifrado de metadatos de aquellas evidencias que no tengan informado el parámetro metadataCipherPublicKey.

En caso de que este parámetro no sea configurado solo se cifrarán los metadatos de las evidencias que tengan informado el atributo metadataCipherPublicKey en el mensaje que solicita la petición
