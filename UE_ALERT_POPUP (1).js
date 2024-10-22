/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(['N/record', 'N/ui/serverWidget'], function (record, serverWidget) {
    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW) {
            try {
                var currentRecord = context.newRecord;
                var alertMessage = currentRecord.getValue('custentity_client_alert');
                log.debug('alertMessage', alertMessage);
                var form = context.form;

                // Add an inline HTML field to the form
              if(alertMessage)
              { var hideFld2 = form.addField({
                    id: 'custpage_hidebuttons2',
                    label: 'not shown - hidden',
                    type: serverWidget.FieldType.INLINEHTML
                });

                // Construct the inline HTML string
                var str = `
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            var alertMessage = ${JSON.stringify(alertMessage)};
                            if (alertMessage) {
                                alert(alertMessage);
                            }
                        });
                    </script>
                `;

                // Set the default value for the hidden field
                hideFld2.defaultValue = str;
            }

                log.debug("success", "Alert setup successfully");
            } catch (e) {
                log.debug("error in function", e);
            }
        }
    }

    return {
        beforeLoad: beforeLoad,
    };
});
