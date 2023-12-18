/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord', 'N/search', 'N/ui/dialog', 'N/log'], 
    function(currentRecord, search, dialog, log) {
    function saveRecord(context) {
        var currentRecord = context.currentRecord;

        var dealName = currentRecord.getValue({
            fieldId: 'title' 
        });

        var opportunitySearchObj = search.create({
            type: "opportunity",
            filters: [],
            columns: [
                search.createColumn({name: "title", label: "Title"})
            ]
        });

        var searchResultCount = opportunitySearchObj.runPaged().count;
        log.debug("opportunitySearchObj result count", searchResultCount);

        opportunitySearchObj.run().each(function(result){
            return true;
        });

        if (searchResultCount > 0) {
            dialog.alert({
                title: 'Duplicate Deal Name',
                message: 'A record with the same Deal Name already exists. Please choose a different Deal Name.'
            });
        }
    }

    return {
        saveRecord: saveRecord
    };
});
