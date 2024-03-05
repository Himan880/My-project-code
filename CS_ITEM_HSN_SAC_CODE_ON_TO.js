/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(['N/currentRecord', 'N/log', 'N/search', 'N/record'], function(currentRecord, log, search, record) {

    function fieldChanged(context) {
        try {
            var currentRecordObj = currentRecord.get();
            var sublistName = context.sublistId;
            var fieldName = context.fieldId;

            if (sublistName === 'item' && fieldName === 'item') {
                var line = context.line; 
                var itemId = currentRecordObj.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: line 
                });
               
                   var inventoryitemSearchObj = search.create({
                    type: "item",
                    filters: [
                        ["internalid", "anyof", itemId]
                    ],
                    columns: [
                        search.createColumn({
                            name: "itemid",
                            sort: search.Sort.ASC,
                            label: "Name"
                        }),
                        search.createColumn({
                            name: "custitem_in_hsn_code",
                            label: "HSN or SAC Code"
                        })
                    ]
                });

                var searchResultCount = inventoryitemSearchObj.runPaged().count;
                log.debug("inventoryitemSearchObj result count", searchResultCount);
          //  alert ('searchResultCount'+searchResultCount);
                inventoryitemSearchObj.run().each(function(result) {
                    var hsnCode = result.getValue({
                        name: "custitem_in_hsn_code"
                    });
					if(hsnCode){
                    currentRecordObj.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_in_hsn_code',
                        value: hsnCode,
                        ignoreFieldChange: true,
                        forceSyncSourcing: true,
                        line: line 
                    });
					}
                    return true; 
                });
            }
        } catch (e) {
            log.error('Error', e.message);
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});
