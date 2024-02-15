/** 
* @NApiVersion 2.x 
* @NScriptType MapReduceScript 
*/ 

define(['N/search','N/record'], function (search,record) { 
function getInputData() { 

var employeeSearchObj = search.create({
   type: "inventorytransfer",
   filters:
   [
      ["type","anyof","InvTrnfr"], 
      "AND", 
      ["mainline","is","F"], 
      "AND", 
      ["location","anyof","237"]
   ],
   columns:
   [
      search.createColumn({name: "trandate", label: "Date"}),
      search.createColumn({
         name: "tranid",
         sort: search.Sort.ASC,
         label: "Document Number"
      }),
      search.createColumn({name: "item", label: "Item"}),
      search.createColumn({name: "memo", label: "Memo"}),
      search.createColumn({name: "location", label: "Location"}),
      search.createColumn({name: "quantity", label: "Quantity"}),
      search.createColumn({name: "amount", label: "Amount"})
   ]
});
var searchResultCount = employeeSearchObj.runPaged().count;
log.debug("employeeSearchObj result count",searchResultCount);
   return employeeSearchObj;
    } 


    function map(context) { 
	var data = JSON.parse(context.value);
	log.debug('data',data);
	var invoiceRecord = data.recordType;
	log.debug('invoiceRecord',invoiceRecord);
	var invoiceID = data.id;
	log.debug('invoiceID',invoiceID);
	var loadInvoiceRec =  record.delete({
		type :'inventorytransfer',
		id : invoiceID
	});
	} 

    function reduce(context) { 

    } 
    function summarize(context) {   
	
} 
return { 

        getInputData: getInputData, 
		map: map, 
        reduce: reduce, 
        summarize: summarize 

    }; 

}); 