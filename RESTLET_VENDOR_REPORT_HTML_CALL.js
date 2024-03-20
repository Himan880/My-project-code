[17:10] Shubham Barnwal
/**

*@NApiVersion 2.x

*@NScriptType Restlet

*/

define(['N/search', 'N/log'], function (search, log) {
 
    function _post(context) {

        var dynamic_ser = search.create({

            columns: context.columns,

            filters: context.filters,

            settings: context.settings,

            type: context.type
 
        });
 
        var results = dynamic_ser.runPaged({

            pageSize: 1000

        });
 
        if (results.count > 0) {

            var data = [];

            results.pageRanges.forEach(function (pageRange) {

                var myPage = results.fetch({ index: pageRange.index });
 
                data = data.concat(myPage.data)

            });
 
            return {data:data};

        } else {

            return [];

        }

    }

    return {

        post: _post

    }

});