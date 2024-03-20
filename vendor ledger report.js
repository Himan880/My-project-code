<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vendor Balance Report</title>
    <!-- bootstrap minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css" />

    <!--css-->
    <link rel="stylesheet"
        href="https://5530194.app.netsuite.com/core/media/media.nl?id=12083&amp;c=5530194&amp;h=Rz8babqL8oH4MuIzHn13PcjACEH6BGNIicaEl84olnCIQoT_&_xt=.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">
    <!--script src="https://code.jquery.com/jquery-3.3.1.js"></script-->
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>

    <!-- <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
-->
    <link href="https://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" rel="Stylesheet">
    </link>
    <script src='https://cdn.rawgit.com/pguso/jquery-plugin-circliful/master/js/jquery.circliful.min.js'></script>
    <script src="https://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>


    <style>
        .settings {
            background: #ccc;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: absolute;
            display: none;
        }

        .settings-open {
            display: block;
        }

        .settings-close {
            display: none;
        }

        .exports {
            background: #ecf7ff;
        }

        .exports ul {
            padding: 0;
        }

        .exports li {
            display: inline-block;
            margin: 0 10px;
        }

        .exports li button {
            background: none;
            border: 0;
            vertical-align: middle;
            margin-top: 7px;
        }

        .exports li button img {
            width: 24px;
            height: 24px;
        }

        .lable {
            color: #165db0;
            font-weight: bold;
        }

        .dataTables_wrapper {
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
        }

        .dt-buttons button img {
            width: 22px !important;
            height: 22px !important;
        }

        .dt-buttons button {
            background: #fff !important;
            border: 0 !important;
            margin: 0;
            padding: 0 5px 0 0;
        }

        .dt-buttons button.buttons-csv span,
        .dt-buttons button.buttons-excel span,
        .dt-buttons button.buttons-pdf span {
            display: none;
        }

        .dt-buttons button.buttons-page-length span {
            display: block;
        }

        .maintable input[type=search] {
            -webkit-appearance: 0 !important;
            border: 1px solid rgb(169, 169, 169);
        }

        .dataTables_filter label {
            color: #165db0;
            font-weight: bold;
            text-transform: uppercase;
        }

        table.dataTable tfoot th {
            text-align: right;
            padding-right: 10px !important;
        }

        .ui-autocomplete {
            cursor: pointer;
            height: 120px;
            overflow-y: scroll;
        }
    </style>
</head>

<body>
    <div class="container-fluid p0">
        <div class="header">
            <div>
                <h1 class="title">VENDOR BALANCE REPORT</h1>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped  active" role="progressbar"
                    style="width: 100%">
                    <span class="sr-only">Loading.....</span>
                </div>
            </div>
        </div>
        <div class="row mt15">

            <div class="col-md-2">
                <lable class="lable">START DATE </label>
            </div>
            <div class="col-md-2">
                <lable class="lable">END DATE</label>
            </div>
            <div class="col-md-2">
                <lable class="lable">VENDOR</label>
            </div>
            <!-- <div class="col-md-2">
               <lable class="lable">SUBSIDIARY</label>
            </div>
            <div class="col-md-2">
                <lable class="lable">VENDOR CATEGORY</label>
             </div>
              <div class="col-md-2">
               <lable class="lable">ACCOUNT</label>
            </div> -->
            <!-- <div class="col-md-1">

            </div> -->

        </div>
        <div class="row mt15">

            <div class="col-md-2">
                <input class="form-control date-range-filter" id="fromdate" name="date" placeholder="Start date"
                    type="text" />
            </div>
            <div class="col-md-2">
                <input class="form-control date-range-filter" id="todate" name="date" placeholder="To date"
                    type="text" />
            </div>
            <div class="col-md-2">
                <!--select class="grid100" id="sel_vendor"></select-->
                <input id="vendor-name" name="vendor" id="searchbox" class="form-control date-range-filter" />

            </div>
            <!-- <div class="col-md-2">
                <select class="grid100" id="sel_subsidiary"></select>
            </div> -->
            <!-- <div class="col-md-2">
                <select class="grid100" id="sel_ven_category"></select>
            </div> -->
            <!-- <div class="col-md-2">
                <select class="grid100" id="sel_account"></select>
            </div> -->
            <div class="col-md-1">
                <button type="submit" class="btn btn-primary" id="btnclick">SEARCH</button><input type="hidden"
                    id="sel_vendor" />
            </div>

        </div>

    </div>


    <div class="row m0">
        <br>
        <div class="maintable">
            <table class="table table-bordered display">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>OPENING BALANCE</th>
                        <th>DEBIT</th>
                        <th>CREDIT</th>
                        <th>CLOSING BALANCE</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th id="openingTot"></th>
                        <th id="debitTot"></th>
                        <th id="creditTot"></th>
                        <th id="closingTot"></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    </div>

    <!--script src="https://code.jquery.com/jquery-1.11.3.min.js"></script-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
    <!--script src="https://5027795.app.netsuite.com/core/media/media.nl?id=4120&c=4912943&h=99517308b6f206fdcb6b&_xt=.js"></script>
    <script src="https://5027795.app.netsuite.com/core/media/media.nl?id=4120&c=4912943&h=99517308b6f206fdcb6b&_xt=.js"></script>
    <script src="https://momentjs.com/downloads/moment.min.js"></script-->

    <script>


        $(document).ready(function () {
            var queries = {};
            $.each(document.location.search.substr(1).split('&'), function (c, q) {
                var i = q.split('=');
                queries[i[0].toString()] = i[1].toString();
            });
            // SUM PLUGIN
            jQuery.fn.dataTable.Api.register('sum()', function () {
                return this.flatten().reduce(function (a, b) {
                    if (typeof a === 'string') {
                        a = a.replace(/[^\d.-]/g, '') * 1;
                    }
                    if (typeof b === 'string') {
                        b = b.replace(/[^\d.-]/g, '') * 1;
                    }

                    return a + b;
                }, 0);
            });

            // set default dates
            var start = new Date();
            // set end date to max one year period:
            var end = new Date(new Date().setYear(start.getFullYear() + 1));

            $('#fromdate').datepicker({
                //startDate : start,
                //endDate   : end
                // update "toDate" defaults whenever "fromDate" changes
                format: 'dd/mm/yyyy'
            })

            /*.on('changeDate', function(){
            // set the "toDate" start to not be later than "fromDate" ends:
            $('#todate').datepicker('setStartDate', new Date($(this).val()));
            }); */

            $('#todate').datepicker({
                //startDate : start,
                //endDate   : end
                // update "fromDate" defaults whenever "toDate" changes
                format: 'dd/mm/yyyy'
            })


            var table = $('.display').DataTable();
            var vendor_detail = [],
                vendor_detail_id = [],
                unique_array = [],
                balance_amt = [],
                detail_balance1 = [],
                detail_balance2 = [],
                prev_charge = [],
                prev_payment = [];
            var resp = "",
                vendor_option = "",
                table_data = " ",
                name = [],
                detail_desc = "";
            var total_balance;
            var subsidiary_detail = [],
                subsidiary_detail_id = [],
                vendor_ids = [],
                unique_array1 = [],
                vendor_ids_first = [],
                ven_category_detail = [],
                ven_category_detail_id = [],
                ven_category_detail_id_2 = [],
                unique_array1_ven_category = [];
            var subsidiary_option = "", acc_option = "", vendor_category = "";


            var apiurl = "/app/site/hosting/restlet.nl?script=2738&deploy=1";
            var data = {
                "type": "vendor",

                "filters": [],
                "columns": [{
                    "name": "entityid",
                    "type": "text",
                    "label": "Name",
                }, {
                    "name": "companyname",
                    "type": "text",
                    "label": "Name",
                }]
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": apiurl,
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": JSON.stringify(data)
            }
            //Remove Duplicates
            function removeDuplicates(arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (unique_array.indexOf(arr[i]) == -1) {
                        unique_array.push(arr[i]);
                    }
                }
                return unique_array;
            }

            function removeDuplicates1(arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (unique_array1.indexOf(arr[i]) == -1) {
                        unique_array1.push(arr[i]);
                    }
                }
                return unique_array1;
            }
            function removeDuplicates2(arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (unique_array1_ven_category.indexOf(arr[i]) == -1) {
                        unique_array1_ven_category.push(arr[i]);
                    }
                }
                return unique_array1_ven_category;
            }

            //Total calc
            function total_calculation(total, value, index, array) {
                return total + value;
            }

            //Remove Falsy value
            function bouncer(arr) {
                return arr.filter(Boolean);
            }

            //Replace Zeros
            function replace_zero(val, arg) {
                val = val.split("/");
                if (val[0] && val[1]) {
                    val[0] = val[0].replace(/^0+/, '');
                    val[1] = val[1].replace(/^0+/, '');
                }
                if (arg == "arg") {
                    return (val[1] + "/" + val[0] + "/" + val[2]).toString();
                }

                return (val[0] + "/" + val[1] + "/" + val[2]).toString();

            }
            //check
            function dateCheck(from, to, check) {
                var fDate, lDate, cDate;
                fDate = Date.parse(from);
                lDate = Date.parse(to);
                cDate = Date.parse(check);
                if ((cDate >= fDate && cDate <= lDate)) {
                    return true;
                }
                return false;
            }
            //OpeningBalance Date
            function OpeningdateCheck(from, to, check) {
                var fDate, lDate, cDate;
                fDate = Date.parse(from);
                lDate = Date.parse(to);
                cDate = Date.parse(check);
                if ((cDate <= lDate && cDate <= fDate)) {
                    return true;
                }
                return false;
            }
            //NAN check
            function not_a_number(data) {
                if (isNaN(data)) {
                    return data ="";
                } else {
                    return data;
                }
            }
            function isInArray(value, array) {
                return array.indexOf(value) > -1;
            }
            function formatNumber(num) {
                var n1, n2;
                num = num + '' || '';
                // works for integer and floating as well
                n1 = num.split('.');
                n2 = n1[1] || null;
                n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
                num = n2 ? n1 + '.' + n2 : n1;
                return num;
            }
            //AJAX - Default call for select options
            $.ajax(settings).done(function (response) {
                var info = response.data;
                console.log('search_result', info)
                for (i in info) {
                    vendor_detail.push(info[i].values.entityid + "::" + info[i].values.companyname + '/' + info[i].id);
                }

                console.log('vendor details' + vendor_detail)
                removeDuplicates(vendor_detail);


                //select options
                vendor_option += "<option>All</option>";
                var availableTags = [];
                availableTags.push({
                    key: "All",
                    value: "All"
                })
                for (var i = 0; i < unique_array.length; i++) {
                    var vendor_split = unique_array[i].split('/');
                    vendor_option += "<option value=" + vendor_split[1] + ">" + vendor_split[0] + "</option>";
                    vendor_ids.push(vendor_split[0]);
                    vendor_ids_first.push(vendor_split[0]);
                    // $("#sel_vendor").html(vendor_option);
                    availableTags.push({
                        key: vendor_split[1],
                        value: vendor_split[0]
                    })
                }

                $("#vendor-name").autocomplete({
                    minLength: 0,
                    source: availableTags,
                    minLength: 0,
                    scroll: true,
                    focus: function (event, ui) {
                        $("#vendor-name").val(ui.item.value);
                        return false;
                    },
                    select: function (event, ui) {
                        $("#vendor-name").val(ui.item.value);
                        $("#sel_vendor").val(ui.item.key);

                        return false;
                    }
                });
                console.log(availableTags);

            });

            // var apiurl = "/app/site/hosting/restlet.nl?script=273&deploy=1";
            // var data = {
            //     "type": "subsidiary",

            //     "filters": [],
            //     "columns": [{
            //         "name": "name",
            //         "type": "text",
            //         "label": "Name",
            //     }],
            // }


            var settings = {
                "async": true,
                "crossDomain": true,
                "url": apiurl,
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": JSON.stringify(data)
            }


            // $.ajax(settings).done(function(response1) {
            //     var info = response1.data;
            //     console.log(info);

            //     //All datas
            //     for (i in info) {
            //         subsidiary_detail.push(info[i].values.name);
            //         subsidiary_detail_id.push(info[i].id);
            //     }

            //     removeDuplicates1(subsidiary_detail);        //select options

            //     subsidiary_option += "<option>All</option>";
            //     for (var i = 0; i < unique_array1.length; i++) {
            //         subsidiary_option += "<option value=" + subsidiary_detail_id[i] + ">" + unique_array1[i] + "</option>";
            //         $("#sel_subsidiary").html(subsidiary_option);
            //     }

            // });

            // //ven category
            // var apiurl = "/app/site/hosting/restlet.nl?script=719&deploy=1";
            // var data = {
            //     "type": "transaction",

            //     "filters": [["vendor.custentity1","anyof","1"]],
            //     "columns": [{
            //      "name": "custentity1",
            //      "join": "vendor",
            //      "label": "Vendor Category"
            //     }],
            // }




            // var settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": apiurl,
            //     "method": "POST",
            //     "headers": {
            //         "content-type": "application/json"
            //     },
            //     "processData": false,
            //     "data": JSON.stringify(data)
            // }


            // $.ajax(settings).done(function(response1) {
            //     var info = response1.data;
            //     console.log(info);


            //     //All datas
            //     for (i in info) {
            //         ven_category_detail.push(info[i].values.custentity1);
            //         ven_category_detail_id.push(info[i].id);
            //     }

            //     removeDuplicates1(ven_category_detail);        //select options

            //     vendor_category += "<option>All</option>";
            //     for (var i = 0; i < unique_array1_ven_category.length; i++) {
            //         vendor_category += "<option value=" + ven_category_detail_id[i] + ">" + unique_array1_ven_category[i] + "</option>";
            //         $("#sel_ven_category").html(vendor_category);
            //     }

            // });

            // ajax settings
            var service_settings = {
                "async": true,
                "crossDomain": true,
                "retries": 3,
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false
            };

            // service = new __Service(service_settings);
            // service.setUrl(apiurl)
            // service.getSearch({
            // "type": "customlist434",
            // "columns": [new nlobjSearchColumn("name")]
            // }, function (response) {
            // var vendor_category_select = new __HtmlSelect(response.data);
            // vendor_category_select.render("#sel_ven_category", "vendor category", -1);
            // });



            //end
            // var apiurl = "/app/site/hosting/restlet.nl?script=273&deploy=1";
            // var data = {
            //     "type": "account",

            //     "filters": [["type","anyof","AcctPay"]],
            //     "columns": [ {
            //      name: "name",
            //      sort: "ASC",
            //      label: "Name"
            //   }],
            // }


            // var settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": apiurl,
            //     "method": "POST",
            //     "headers": {
            //         "content-type": "application/json"
            //     },
            //     "processData": false,
            //     "data": JSON.stringify(data)
            // }



            // $.ajax(settings).done(function(response1) {
            //     var info = response1.data;

            //     //All datas
            //       acc_option += "<option>All</option>";
            //     for (i in info) {

            //          acc_option += "<option value=" + info[i].id + ">" + info[i].values.name + "</option>";
            //     }
            //     $("#sel_account").html(acc_option);



            // });




            $("#btnclick").click(function () {

                // alert(queries['name']);
                var from_date = $("#fromdate").val();
                var to_date = $("#todate").val();

                if ($("#fromdate").val() == "") {
                    alert("Please enter the Start Date");
                    return false;
                } else if ($("#todate").val() == "") {
                    alert("Please enter the End Date");
                    return false;
                } else if (Date.parse(from_date) > Date.parse(to_date)) {

                    alert("Start date should not be greater than end date");
                    return false;
                } else {
                    data_filtering(from_date, to_date);
                }

                //Filtering
                function data_filtering(from_date, to_date) {

                    var sel_vendor = $("#sel_vendor").val();


                    if (sel_vendor != 'All') {
                        vendor_ids = [];
                        console.log("if");
                        console.log(sel_vendor);
                        vendor_ids.push($("#sel_vendor :selected").text());
                    } else if (sel_vendor == 'All') {
                        vendor_ids = [];
                        vendor_ids = vendor_ids_first;
                        console.log("else");
                        console.log(sel_vendor);
                    }
                    console.log(vendor_ids);
                    resp = " ";
                    detail_desc = " ";
                    $(".table_body").html(resp);
                    $(".detailed_description").html(detail_desc);

                    //Previous Date calculation
                    var from_date1 = from_date.split("/");
                    var ct_from_date = new Date(from_date1[2], from_date1[1] - 1, from_date1[0]);
                    var date = new Date(from_date1[2] + '-' + from_date1[1] + '-' + from_date1[0]);
                    //alert(from_date1[2])
                    var open_year = parseInt(from_date1[2]) - 1;
                    var open_date = '01/04/' + open_year;
                    //alert(open_date)

                    var newdate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 1) // days is the number of days you want to shift the date by
                    var trandate = newdate.getDate() + '/' + (newdate.getMonth() + 1) + '/' + newdate.getFullYear();

                    var ct_from_date1 = from_date1[0] + "/" + from_date1[1] + "/" + from_date1[2];

                    var to_date1 = to_date.split("/");
                    var ct_to_date1 = to_date1[0] + "/" + to_date1[1] + "/" + to_date1[2];
                    ct_from_date.setDate(ct_from_date.getDate() - 1);

                    var last_year = parseInt(to_date1[2]) - 1;
                    var opening_date = '31/12/' + last_year;

                    ct_from_date = ct_from_date.getDate() + "/" + (ct_from_date.getMonth() + 1) + "/" + ct_from_date.getFullYear();
                    //Datas
                    var apiurl = "/app/site/hosting/restlet.nl?script=2738&deploy=1";
                    // var sel_subsidiary = $("#sel_subsidiary").val();
                    // var sel_ven_category = $("#sel_ven_category").val();
                    // console.log(sel_ven_category);
                    // var sel_account = $("#sel_account").val();

                    // if (sel_ven_category == 'All')
                    //    var ven_act_list=["1","2","3","4","5","6","7","8","9","10","11","12"];
                    //    else
                    //    console.log(sel_ven_category);
                    //     var ven_act_list=[sel_ven_category];

                    //  if (sel_account == 'All')
                    //    var acc_list=["315","316","317","318","319","320","321","322","641","656","324","325","121"];
                    //    else
                    //     var acc_list=[sel_account];

                    //alert(sel_vendor)

                    var vendor_data = {
                        "type": "transaction",
                        "filters": [
                        ["account","anyof","240","527","241","546", "122"],
                            "AND",
                            ["posting", "is", "T"],
                            "AND",
                            ["type", "noneof", "VPrepApp"]

                        ],
                        "columns": [{
                            name: "entity",
                            summary: "GROUP",
                            sortdir: "ASC",
                            label: "Name"
                        }, {
                            "formula": "SUM(Case when ({trandate}<TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Other Current Asset') then - nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Expense','Other Expense','Cost of Goods Sold') Then nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then -nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} not in ('Income', 'Other Income', 'Expense', 'Other Expense', 'Cost of Goods Sold','Deferred Revenue','Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then nvl ({amount},0) ELSE 0.00 END)+(SUM(Case When ({trandate} between TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) Then NVL({debitamount},0) ELSE 0.00 END)-SUM(Case When ({trandate} between TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) Then nvl({creditamount},0) ELSE 0.00 END))",
                            label: "Formula (Currency)",
                            "functionid": null,
                            "index": -1,
                            "join": null,
                            "label": "Opening Balance",
                            "name": "formulanumeric",
                            "sortdir": null,
                            "summary": "SUM",
                            "type": "float",
                            "userindex": -1,
                            "whenorderedby": null,
                            "whenorderedbyjoin": null
                        }, {
                            "formula": "case when {trandate} >= to_date('" + ct_from_date1 + "', 'dd/mm/yyyy') and {trandate} <= to_date ('" + ct_to_date1 + "', 'dd/mm/yyyy') then {debitamount} else 0 end",
                            "functionid": null,
                            "index": -1,
                            "join": null,
                            "label": "Debit",
                            "name": "formulanumeric",
                            "sortdir": null,
                            "summary": "SUM",
                            "type": "float",
                            "userindex": -1,
                            "whenorderedby": null,
                            "whenorderedbyjoin": null
                        }, {
                            "formula": "case when {trandate} >= to_date('" + ct_from_date1 + "', 'dd/mm/yyyy') and {trandate} <= to_date ('" + ct_to_date1 + "', 'dd/mm/yyyy') then {creditamount} else 0 end",
                            "functionid": null,
                            "index": -1,
                            "join": null,
                            "label": "Debit",
                            "name": "formulanumeric",
                            "sortdir": null,
                            "summary": "SUM",
                            "type": "float",
                            "userindex": -1,
                            "whenorderedby": null,
                            "whenorderedbyjoin": null
                        }, {
                            "formula": "SUM(Case when ({trandate}<TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Other Current Asset') then + nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Expense','Other Expense','Cost of Goods Sold') Then nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then -nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} not in ('Income', 'Other Income', 'Expense', 'Other Expense', 'Cost of Goods Sold','Deferred Revenue','Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then nvl ({amount},0) ELSE 0.00 END)+(SUM(Case When ({trandate} between TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) Then NVL({debitamount},0) ELSE 0.00 END)-SUM(Case When ({trandate} between TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) Then nvl({creditamount},0) ELSE 0.00 END))",
                            "functionid": null,
                            "index": -1,
                            "join": null,
                            "label": "Ending Balance",
                            "name": "formulanumeric",
                            "sortdir": null,
                            "summary": "SUM",
                            "type": "float",
                            "userindex": -1,
                            "whenorderedby": null,
                            "whenorderedbyjoin": null
                        }],
                        // settings: [{
                        //     "name": "consolidationtype",
                        //     "value": "none"
                        // }]
                    }

                    var vendor_balance_settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": apiurl,
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json"
                        },
                        "processData": false,
                        "data": JSON.stringify(vendor_data)
                    }

                    $.ajax(vendor_balance_settings).done(function (response) {
                        table.destroy();
                        prev_charge = [], prev_payment = [];
                        var all_info = response.data;

                        var from_date = $("#fromdate").val();
                        var from_date1 = from_date.split("/");
                        var ct_from_date1 = from_date1[0] + "/" + from_date1[1] + "/" + from_date1[2];

                        var d11 = from_date1[1] + "/" + from_date1[0] + "/" + from_date1[2];
                        var d1 = new Date(d11);

                        var to_date = $("#todate").val();
                        var to_date1 = to_date.split("/");
                        var ct_to_date1 = to_date1[0] + "/" + to_date1[1] + "/" + to_date1[2];

                        var d22 = to_date1[1] + "/" + to_date1[0] + "/" + to_date1[2];
                        var d2 = new Date(d22);
                        var opening_balance = 0;

                        $(".display").empty();

                        if (sel_vendor == 'All') {
                            createGridForAll(all_info, ct_from_date1, ct_to_date1);
                        }
                        else {
                            var vendor_data = {
                                "type": "transaction",
                                "filters": [
                                ["account","anyof","240","527","241","546","122"],
                                    "AND",
                                    ["posting", "is", "T"],
                                    "AND",
                                    ["name", "anyof", sel_vendor],
                                    "AND",
                                    ["type", "noneof", "VPrepApp"],

                                ],
                                "columns": [{
                                    name: "entity",
                                    summary: "GROUP",
                                    label: "Name"
                                },
                                {
                                    name: "transactionnumber",
                                    summary: "GROUP",
                                    label: "Transaction Number"
                                },
                                {
                                    name: "tranid",
                                    summary: "GROUP",
                                    label: "Document Number"
                                },
                                {
                                    name: "type",
                                    summary: "GROUP",
                                    label: "Type"
                                },
                                {
                                    name: "internalid",
                                    summary: "MIN",
                                    label: "internalid"
                                },
                                {
                                    name: "trandate",
                                    summary: "GROUP",
                                    label: "date"
                                },
                                {
                                    name: "formulacurrency",
                                    summary: "SUM",
                                    formula: "(Case when ({trandate}<TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Other Current Asset') then - nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Expense','Other Expense','Cost of Goods Sold') Then nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} in ('Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then -nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) and {accounttype} not in ('Income', 'Other Income', 'Expense', 'Other Expense', 'Cost of Goods Sold','Deferred Revenue','Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then nvl ({amount},0) ELSE 0.00 END)+((Case When ({trandate} between TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) Then NVL({debitamount},0) ELSE 0.00 END)-(Case When ({trandate} between TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_from_date + "' ,'dd-mm-yyyy')) Then nvl({creditamount},0) ELSE 0.00 END))",
                                    label: "Formula (Currency)"
                                },
                                {
                                    name: "formulanumeric",
                                    summary: "SUM",
                                    formula: "case when {trandate} >= to_date('" + ct_from_date1 + "', 'dd/mm/yyyy') and {trandate} <= to_date ('" + ct_to_date1 + "', 'dd/mm/yyyy') then {creditamount} else 0 end",
                                    label: "Formula (Numeric)"
                                },
                                {
                                    name: "formulanumeric",
                                    summary: "SUM",
                                    formula: "case when {trandate} >= to_date('" + ct_from_date1 + "', 'dd/mm/yyyy') and {trandate} <= to_date ('" + ct_to_date1 + "', 'dd/mm/yyyy') then {debitamount} else 0 end",
                                    label: "Formula (Numeric)"
                                },
                                {
                                    name: "formulanumeric",
                                    summary: "SUM",
                                    formula: "SUM(Case when ({trandate}<TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Other Current Asset') then + nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Expense','Other Expense','Cost of Goods Sold') Then nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} in ('Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then -nvl ({amount},0) when ({trandate} <TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) and {accounttype} not in ('Income', 'Other Income', 'Expense', 'Other Expense', 'Cost of Goods Sold','Deferred Revenue','Equity','Other Current Liability','Accounts Payable','Long Term Liability') Then nvl ({amount},0) ELSE 0.00 END)+(SUM(Case When ({trandate} between TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) Then NVL({debitamount},0) ELSE 0.00 END)-SUM(Case When ({trandate} between TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy') AND TO_DATE('" + ct_to_date1 + "' ,'dd-mm-yyyy')) Then nvl({creditamount},0) ELSE 0.00 END))"
                                },
                                {
                                    name: "companyname",
                                    join: "vendor",
                                    summary: "GROUP",
                                    label: "Company Name"
                                }]
                            }

                            var vendor_balance_settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": apiurl,
                                "method": "POST",
                                "headers": {
                                    "content-type": "application/json"
                                },
                                "processData": false,
                                "data": JSON.stringify(vendor_data)
                            }

                            $.ajax(vendor_balance_settings).done(function (response) {
                                var info = response.data;
                                console.log(info);
                                var vendor_name = $('#vendor-name').val();
                                vendor_name = vendor_name.split("::")[0];
                                var vendor = all_info.find(function (v) {
                                    return vendor_name == v["values"]["GROUP(entity)"][0]["text"];
                                });
                                opening_balance = vendor != null ? parseFloat(vendor["values"]["SUM(formulanumeric)"]) : 0;
                                createGridForVendor(info, ct_from_date1, ct_to_date1, d1, d2, -opening_balance);
                            });
                        }
                    });
                }

            });

            function createGridForAll(info, ct_from_date, ct_to_date) {
                var sub_table_header = ["NAME", "OPENING BALANCE", "DEBIT", "CREDIT", "CLOSING BALANCE"];

                var html_text = "<thead><tr>"
                for (var i = 0; i < sub_table_header.length; i++) {
                    html_text += "<th>" + sub_table_header[i] + "</th>"
                }
                html_text += "</tr></thead>";

                var openingTot = 0,
                    debitTot1 = 0,
                    creditTot = 0,
                    closingTot = 0;

                html_text += '<tfoot align="right" ><tr><th>Total</th><th align="right" id="openingTot"></th><th id="debitTot" align="right"></th><th id="creditTot" align="right"></th><th id="closingTot" align="right"></th></tr></tfoot>';
                html_text += "<tbody>";

                for (var i in info) {
                    $(document).attr("title", "VENDOR BALANCE REPORT (" + ct_from_date + ' to ' + ct_to_date + ')');
                    if (info[i]["values"]["GROUP(entity)"].length > 0) {

                        var op_sign_disp = '';
                        // if(info[i]["values"]["SUM(formulanumeric)"] >0){
                        //     op_sign_disp = '(Cr) ';
                        // }
                        // else if(info[i]["values"]["SUM(formulanumeric)"] <0){
                        //      op_sign_disp = '(Dr) ';
                        // }

                        var cl_sign_disp = '';
                        // if(info[i]["values"]["SUM(formulanumeric)_3"] >0){
                        //     cl_sign_disp = '(Cr) ';
                        // }
                        // else if(info[i]["values"]["SUM(formulanumeric)_3"] <0){
                        //      cl_sign_disp = '(Dr) ';
                        // }

                        html_text += "<tr>";
                        html_text += "<td>" + info[i]["values"]["GROUP(entity)"][0]["text"] + "</td>";
                        html_text += "<td align=right>" + formatNumber(not_a_number(parseFloat(-(info[i]["values"]["SUM(formulanumeric)"])).toFixed(2))) + " " + op_sign_disp + "</td>";

                        html_text += "<td align=right>" + formatNumber(not_a_number(parseFloat(info[i]["values"]["SUM(formulanumeric)_1"]).toFixed(2))) + "</td>";
                        html_text += "<td align=right>" + formatNumber(not_a_number(parseFloat(info[i]["values"]["SUM(formulanumeric)_2"]).toFixed(2))) + "</td>";

                        html_text += "<td align=right>" + formatNumber(not_a_number(parseFloat(-(info[i]["values"]["SUM(formulanumeric)_3"])).toFixed(2))) + " " + cl_sign_disp + "</td>";
                        html_text += "</tr>";

                        if (info[i]["values"]["SUM(formulanumeric)"] != '')
                            openingTot += parseFloat(info[i]["values"]["SUM(formulanumeric)"]);

                        if (info[i]["values"]["SUM(formulanumeric)_1"] != "")
                            debitTot1 += parseFloat(info[i]["values"]["SUM(formulanumeric)_1"]);
                        if (info[i]["values"]["SUM(formulanumeric)_2"] != "")
                            creditTot += parseFloat(info[i]["values"]["SUM(formulanumeric)_2"]);
                        if (info[i]["values"]["SUM(formulanumeric)_3"] != "")
                            closingTot += parseFloat(info[i]["values"]["SUM(formulanumeric)_3"]);
                    }
                }
                html_text += "</tbody>";
                $(".display").html(html_text);
                createGrid();
                setFooterTotals(openingTot, debitTot1, creditTot, closingTot);
            }

            function createGridForVendor(info, ct_from_date, ct_to_date, d1, d2, opening_balance) {
                var sub_table_header = ["DATE", "TYPE", "DOCUMENT NUMBER", "TRANSACTION NUMBER", "DEBIT", "CREDIT", "CLOSING BALANCE"];
                var html_text = "<thead><tr>"
                for (var i = 0; i < sub_table_header.length; i++) {
                    html_text += "<th>" + sub_table_header[i] + "</th>"
                }
                html_text += "</tr></thead>";

                var openingTot = 0,
                    debitTot1 = 0,
                    creditTot = 0,
                    closingTot = 0,
                    closing_balance = opening_balance;

                html_text += '<tfoot align="right" ><tr><th> &nbsp;</th><th> &nbsp;</th><th> &nbsp;</th><th>Total</th><th id="debitTot" align="right"></th><th id="creditTot" align="right"></th><th id="closingTot" align="right"></th></tr></tfoot>';

                html_text += "<tbody>";

                html_text += "<tr>";
                html_text += "<td style='display: none;'></td>";
                html_text += "<td colspan='6'>" + "Opening Balance" + "</td>";
                html_text += "<td style='display: none;'></td>";
                html_text += "<td style='display: none;'></td>";
                html_text += "<td style='display: none;'></td>";
                html_text += "<td style='display: none;'></td>";
                html_text += "<td align='right'>" + formatNumber(not_a_number(opening_balance.toFixed(2))) + "</td>";
                html_text += "</tr>";

                for (var i in info) {

                    var tradate = info[i]["values"]["GROUP(trandate)"].split('/');
                    console.log(tradate);
                    var vname = info[i]["values"]["GROUP(vendor.companyname)"];
                    $(document).attr("title", " " + vname + " - (" + ct_from_date + ' to ' + ct_to_date + ')');
                //    var tradate1 = tradate[0];
                var tradate1 = tradate[1] + '/' + tradate[0] + '/' + tradate[2]
                    var d3 = new Date(tradate1);
                    console.log(d3);
                    console.log(d1);
                    console.log(d2);

                    if ((d3 >= d1) && (d3 <= d2)) {

                        var bank_ind_reg = get_new_data(info[i]["values"]["GROUP(transactionnumber)"]);
                        var bank_ind_reg1 = get_new_data1(info[i]["values"]["GROUP(transactionnumber)"]);

                        html_text += "<tr>";
                        html_text += "<td>" + info[i]["values"]["GROUP(trandate)"] + "</td>";
                        html_text += "<td>" + info[i]["values"]["GROUP(type)"][0]["text"] + "</td>";

                        var pagename;
                        if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Bill Payment')
                            pagename = 'vendpymt';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Bill')
                            pagename = 'vendbill';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Journal')
                            pagename = 'journal';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Deposit')
                            pagename = 'deposit';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Expense Report')
                            pagename = 'exprept';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Bill Credit')
                            pagename = 'vendcred';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Vendor Prepayment')
                            pagename = 'vprep';
                        else if (info[i]["values"]["GROUP(type)"][0]["text"] == 'Item Receipt')
                            pagename = 'itemrcpt';

                        if (info[i]["values"]["GROUP(type)"][0]["text"] == 'fxreval' || pagename == '')
                            html_text += "<td >" + info[i]["values"]["GROUP(tranid)"] + "</td>";
                        else {
                            html_text += "<td ><a href='/app/accounting/transactions/" + pagename + ".nl?id=" + info[i]["values"]["MIN(internalid)"] + "&whence=' target='_blank'>" + info[i]["values"]["GROUP(tranid)"] + "</a></td>";
                        }

                        var op_sign_disp = '';
                        // if(info[i]["values"]["SUM(formulacurrency)"] >0){
                        //     op_sign_disp = '(Dr) ';
                        // }
                        // else if(info[i]["values"]["SUM(formulacurrency)"] <0){
                        //     op_sign_disp = '(Cr) ';
                        // }

                        var cl_sign_disp = '';
                        // if(info[i]["values"]["SUM(formulanumeric)_2"] >0){
                        //    cl_sign_disp = '(Dr) ';
                        // }
                        // else if(info[i]["values"]["SUM(formulanumeric)_2"] <0){
                        //       cl_sign_disp = '(Cr) ';
                        // }

                        html_text += "<td>" + info[i]["values"]["GROUP(transactionnumber)"] + "</td>";
                        var debit = parseFloat(info[i]["values"]["SUM(formulanumeric)_1"]);
                        var credit = parseFloat(info[i]["values"]["SUM(formulanumeric)"]);
                        html_text += "<td align=right>" + formatNumber(not_a_number(debit.toFixed(2))) + "</td>";
                        html_text += "<td align=right>" + formatNumber(not_a_number(credit.toFixed(2))) + "</td>";


                        closing_balance = isNaN(credit) ? closing_balance - debit : closing_balance + credit;

                        html_text += "<td align=right>" + formatNumber(not_a_number(parseFloat(closing_balance).toFixed(2))) + "</td>";
                        html_text += "</tr>";

                        if (info[i]["values"]["SUM(formulanumeric)_1"] != "")
                            debitTot1 += parseFloat(info[i]["values"]["SUM(formulanumeric)_1"]);
                        if (info[i]["values"]["SUM(formulanumeric)"] != "")
                            creditTot += parseFloat(info[i]["values"]["SUM(formulanumeric)"]);
                    }
                }
                html_text += "</tbody>";
                $(".display").html(html_text);
                createGrid();
                setFooterTotals(openingTot, debitTot1, creditTot, closing_balance);
            }

            function createGrid() {
                table = $('.display').DataTable({
                    retrieve: true,
                    destroy: true,
                    fixedHeader: false,
                    "order": [],
                    dom: 'Bfrtip',
                    lengthMenu: [
                        [10, 25, 50, -1],
                        ['10 rows', '25 rows', '50 rows', 'Show all']
                    ],

                    buttons: [{
                        extend: "csv",
                        className: "btn-csv",
                        footer: true
                    }, {
                        extend: "excel",
                        className: "btn-sm",
                        footer: true
                    }, {
                        extend: "pdfHtml5",
                        className: "btn-sm",
                        footer: true

                    },
                        'pageLength'
                    ],

                    initComplete: function () {
                        $(".buttons-csv").append('<img src="https://5530194.app.netsuite.com/core/media/media.nl?id=12084&c=5530194&h=1ygHxH84HZqrplXAjL9o8QxPnKBmQNDrhfwfAGy8D-ie0oKa" title="CSV">');
                        $('.buttons-excel').append('<img src="https://5530194.app.netsuite.com/core/media/media.nl?id=12085&c=5530194&h=vYoxGnV9d_mT8tZ1fupcpbC018lWo-wObSCL-Rc4Jy59iWnJ" title="EXCEL">');
                        $('.buttons-pdf').append('<img src="https://5530194.app.netsuite.com/core/media/media.nl?id=12086&c=5530194&h=qmQdCCHcr1OXph_dio-Knx-jlZE0RIH_NQze6t0yhG6Ik-Mo" title="PDF">');
                        $('span.buttons-page-length').css('display', 'block');
                    }
                });
            }

            function setFooterTotals(openingTot, debitTot, creditTot, closingTot) {
                $('#openingTot').html('');
                $('#debitTot').html('');
                $('#creditTot').html('');
                $('#closingTot').html('');

                var opval = not_a_number(openingTot).toFixed(2);
                var dbval = not_a_number(debitTot).toFixed(2);
                var crval = not_a_number(creditTot).toFixed(2);
                var cloval = not_a_number(closingTot).toFixed(2);

                $('#openingTot').append(formatNumber(Math.abs(opval)));
                $('#debitTot').append(formatNumber(dbval))
                $('#creditTot').append(formatNumber(crval))
                $('#closingTot').append(formatNumber(Math.abs(cloval)));
            }

        });



        $(".progress").hide();
        $(document).ajaxStart(function () {
            $(".progress").show();
        });
        $(document).ajaxStop(function () {
            $(".progress").hide();

        });
        $("#settings_btn").on('click', function () {
            $("#settings-body").removeClass("settings-close");
            $("#settings-body").addClass("settings-open");
        });
        $("#btn-setting-close").on('click', function () {
            $("#settings-body").removeClass("settings-open");
            $("#settings-body").addClass("settings-close");
        })


        function get_new_data(id) {
            var apiurl = "/app/site/hosting/restlet.nl?script=2738&deploy=1";
            var acc_data = {
                "type": "vendorpayment",
                "filters": [

                    ["type", "anyof", "VendPymt"],
                    "AND",
                    ["mainline", "is", "T"],
                    "AND",
                    ["transactionnumber", "is", id]

                ],

                "columns":
                    [
                        { name: "transactionnumber", label: "Transaction Number" },
                        { name: "entity", label: "Name" },
                        { name: "accountmain", label: "Account (Main)" }


                    ],

            }


            var bank_reg = {
                "async": false,
                "crossDomain": true,
                "url": apiurl,
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": JSON.stringify(acc_data)
            }

            return bank_reg;
        }


        function get_new_data1(id) {


            var apiurl = "/app/site/hosting/restlet.nl?script=2738&deploy=1";
            var acc_data = {
                "type": "transaction",
                "filters": [

                    ["type", "anyof", "Custom106"],
                    "AND",
                    ["mainline", "is", "T"],
                    "AND",
                    ["accounttype", "anyof", "Bank"],
                    "AND",
                    ["transactionnumbernumber", "equalto", "369"]

                ],

                "columns":
                    [
                        { name: "transactionnumber", label: "Transaction Number" },

                        { name: "account", label: "Account" }


                    ],

            }


            var bank_reg = {
                "async": false,
                "crossDomain": true,
                "url": apiurl,
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": JSON.stringify(acc_data)
            }

            return bank_reg;
        }

        class __Service {
            constructor(settings) {
                this.ajaxsettings = settings
                var _this = this;
                this.requests = [];
                this.ajaxsettings.error = function (xhr, textStatus, errorThrown) {
                    if (DEBUG_ENABLED) {
                        log.error("API", errorThrown);
                        console.log("error", xhr, textStatus, errorThrown);
                    }
                }
            }
            //change url if needed
            setUrl(url) {
                this.ajaxsettings.url = url;
            }
            setAsync(flag) {
                this.ajaxsettings.async = flag;
            }
            getSearch(options, callback) {
                try {
                    this.ajaxsettings.data = JSON.stringify(options);
                    return $.ajax(this.ajaxsettings).done(function (res) {
                        callback(res, options);
                    });
                } catch (e) {
                    if (DEBUG_ENABLED) {
                        log.error("Search ", e);
                        console.error(e);
                    }
                }
            }

            search(options) {
                this.ajaxsettings.data = JSON.stringify(options);
                return $.ajax(this.ajaxsettings);
            }
        }

        class __HtmlSelect {
            constructor(data) {
                this.data = data.map(function (c) {
                    return {
                        value: c.id,
                        text: c["values"]["name"]
                    }
                });
            }
            render(id, name, option) {
                var tpl = "<option value='All'>Please select " + name + "</option>";
                tpl += this.data.map(function (c, i) {
                    if (i == option) {
                        return "<option selected value=" + c.value + ">" + c.text + "</option>";
                    }
                    return "<option value=" + c.value + ">" + c.text + "</option>";
                }).join("")
                $(id).html(tpl);

            }
        }

        class nlobjSearchColumn {
            constructor(name, join, summary) {
                CheckArgs([name], ['name'], 'nlobjSearchColumn');
                this.name = name;
                this.join = join;
                this.summary = summary;
                this.type = null;
                this.label = null;
                this.functionid = null;
                this.formula = null;
                this.sortdir = null;
                this.index = -1;
                this.userindex = -1;
                this.whenorderedby = null;
                this.whenorderedbyjoin = null;
            }

            setFormula(formula) {
                this.formula = formula;
                return this;
            };


        }

        class nlobjSearchFilter {
            constructor(name, join, operator, value, value2) {
                CheckArgs([name], ['name'], 'nlobjSearchFilter');
                this.name = name;
                this.join = join;
                this.operator = operator;
                this.values = new Array();
                this.addValue(value);
                this.addValue(value2);
                this.formula = null;
                this.summarytype = null;
                this.isor = false;
                this.isnot = false;
                this.leftparens = 0;
                this.rightparens = 0;
            }
            addValue(value) {
                if (isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] != null)
                            this.values.push(value[i].toString());
                    }
                }
                else if (value != null)
                    this.values.push(value.toString());
            }

        }

        function CheckArgs(funcArgs, funcArgNames, funcName) {
            for (var i = 0; i < funcArgs.length; i++) {
                if (funcArgs[i] == null || (typeof funcArgs[i] == "string" && isNullorDefault(funcArgs[i]))) {
                    throw CreateError('MISSING_REQD_ARGUMENT', (funcName != null ? funcName + ': ' : '') + 'Missing a required argument: ' + funcArgNames[i]);
                }
            }
        }
        function to_number(s) {
            if (s != undefined && s != "" && s != null)
                return parseFloat(s);
            else
                return 0;
        }
        function isNullorDefault(str) {
            if (str != undefined && str != "" && str != null)
                return false;
            else
                return true;
        }

        function CreateError(code, detail, suppressNotification) {
            window.errorObj = new nlError(code, detail, suppressNotification);
            return window.errorObj;
        }

        class nlError {
            constructor(code, error, suppressnotification) {
                this.code = code;
                this.details = error;
                this.name = this.code;      /* exposed for compatibility with Javascript Error object. */
                this.message = this.details;/* exposed for compatibility with Javascript Error object. */
                this.description = this.details;/* exposed for compatibility with Javascript Error object. */
            }
        }


    </script>

</body>

</html>