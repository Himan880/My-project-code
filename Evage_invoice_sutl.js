/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/record', 'N/render', 'N/search', "N/runtime",'N/query'], function (record, render, search, runtime,query) {
    function onRequest(context) {
        var rec_id = context.request.parameters.recordid;
        var deposit_rec= record.load({
            type: 'invoice',
            id: rec_id
        });
       var get_created_from = deposit_rec.getValue({
            fieldId: 'entity'
        });
var itemArr = []

        var xmlTemplateFile = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">'+
'<pdf>'+
'  <#list 1..3 as i>'+
'<head>'+
'<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />'+
'<#if .locale == "zh_CN">'+
'<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />'+
'<#elseif .locale == "zh_TW">'+
'<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />'+
'<#elseif .locale == "ja_JP">'+
'<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />'+
'<#elseif .locale == "ko_KR">'+
'<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />'+
'<#elseif .locale == "th_TH">'+
'<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />'+
'</#if>'+
'<macrolist>'+
'      <macro id="footer">'+
'        <p style="font-size: 8px; align: center; border-top:0px margin-top:0px"><br/>This is Computer Generated Invoice</p>'+
'      </macro>'+
'    </macrolist>'+
'    <style type="text/css">* {'+
'<#if .locale == "zh_CN">'+
'font-family: NotoSans, NotoSansCJKsc, sans-serif;'+
'<#elseif .locale == "zh_TW">'+
'font-family: NotoSans, NotoSansCJKtc, sans-serif;'+
'<#elseif .locale == "ja_JP">'+
'font-family: NotoSans, NotoSansCJKjp, sans-serif;'+
'<#elseif .locale == "ko_KR">'+
'font-family: NotoSans, NotoSansCJKkr, sans-serif;'+
'<#elseif .locale == "th_TH">'+
'font-family: NotoSans, NotoSansThai, sans-serif;'+
'<#else>'+
'font-family: NotoSans, sans-serif;'+
'</#if>'+
'}'+
'table {'+
'font-size: 9pt;'+
'table-layout: fixed;'+
'}'+
'        th {'+
'            font-weight: bold;'+
'            font-size: 8pt;'+
'            vertical-align: middle;'+
'            padding: 5px 6px 3px;'+
'            color: #333333;'+
'        }'+
'        td {'+
'            padding: 4px 6px;'+
'        }'+
'td p { align:left }'+
'        b {'+
'            font-weight: bold;'+
'            color: #333333;'+
'        }'+
'        table.header td {'+
'            padding: 0px;'+
'            font-size: 10pt;'+
'        }'+
'        table.footer td {'+
'            padding: 0px;'+
'            font-size: 8pt;'+
'        }'+
'        table.itemtable th {'+
'            padding-bottom: 10px;'+
'            padding-top: 10px;'+
'        }'+
' '+
'        table.body td {'+
'            padding-top: 2px;'+
'        }'+
'        table.total {'+
'            page-break-inside: avoid;'+
'        }'+
'        tr.totalrow {'+
'            line-height: 200%;'+
'        }'+
'       td.addressheader {'+
'            font-size: 8pt;'+
'            padding-top: 6px;'+
'            padding-bottom: 2px;'+
'        }'+
'        td.address {'+
'            padding-top: 0px;'+
''+
'        }'+
'  td p {'+
'    text-align: left;'+
'}'+
'        td.totalboxmid {'+
'            font-size: 28pt;'+
'            padding-top: 20px;'+
'        }'+
'        td.totalboxbot {'+
'            font-weight: bold;'+
'        }'+
'        span.title {'+
'            font-size: 28pt;'+
'        }'+
'        span.number {'+
'            font-size: 16pt;'+
'        }'+
'        span.itemname {'+
'            font-weight: bold;'+
'            line-height: 150%;'+
'        }'+
'      .table-empty-space {'+
'        height: 200px;'+
'      }'+
''+
'</style>'+
'</head>'+
'<body padding="0.5in 0.5in 0.5in 0.5in" size="A4" footer="footer" footer-height="2mm">'+
' <table align="center" border="0" cellpadding="4" cellspacing="0" style="width:100%;">'+
'   <tr style = "padding-top: 0px;">'+
'  '+
'     <td style="align:right; border-top : 0px; border: 0px  padding-top: 0px;"><span style="font-size:10px;"> <#if i==1>Original Copy</#if><#if i==2>Duplicate Copy</#if><#if i==3>Extra Copy</#if></span></td>'+
''+
' </tr>'+
' <tr>'+
'    <td style="align:center; border: 0px"><span style="font-size:14px;"><strong>TAX INVOICE</strong></span></td>'+
'</tr>'+
' <#if record.custbody_irn_qr_code != \'\'>'+
''+
'     '+
'<tr style="width:50%">'+
'<td class="address" style="align:left; border-bottom: 0px; border-right: 0px; width:20%;"><strong>IRN</strong>     ${record.custbody_irn_number}</td>'+
''+
'</tr>'+
'<tr style="width:50%">'+
'<td class="address" style="align:left; border-bottom: 0px; width:20%;"><strong>Ack No.</strong><br/>  ${record.custbody_in_ei_ackno}</td>'+
'</tr>'+
'<tr style="width:50%">'+
'   <td class="address" style="align:left; border-bottom: 0px; width:20%;"><strong>Ack Date</strong><br/>  ${record.custbody_in_ei_ackdt}</td>'+
'</tr>'+
' <tr style="width:50%">'+
'<td class="address" style="align:right; border-bottom: 0px; border-right: 0px; width:5%; height:5%; font-size: 10px;"><strong>E-Invoice</strong><br/>'+
'    ${record.custbody_irn_qr_code}'+
'</td>'+
''+
'</tr>'+
'</#if>'+
'  </table>'+
' '+
''+
'  <table align="center" border="1" style="width:100%;"><tr>'+
'   <td rowspan="3" class="address" style="align:left; border-right: 1px; border-bottom: 1px; width:50%"><strong>${record.subsidiary}<br/>'+
'</strong><span style="color:rgb(70,130,180);font-size:12px; align = center; " ></span>${record.custbody_location_address}'+
'</td>'+
'<td class="address" style="align:left; border-right: 1px; border-bottom: 1px; width:25%;">Invoice NO.<br/><b>${record.tranid}</b></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:25%;">Dated<br/><b>${record.trandate}</b></td>'+
'</tr><tr>'+
'<td class="address" style="align:left; border-bottom: 1px; border-right: 1px; width:20%;">Delivery Note<br/><b>${record.custbody_bol_delivery_instructions}</b></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:30%;">Mode/Term of Payment <br/><b>${record.terms}</b></td>'+
'</tr>'+
'<tr>'+
'<td class="address" style="align:left; border-bottom: 1px; border-right: 1px; width:30%;">Reference No. and Date<br/><b>${record.tranid}</b>  <b>${record.trandate}</b></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:10%;">Other References</td>'+
'</tr>'+
'<tr>'+
'<td rowspan="3" class="address" style="align:left; border-bottom: 0px; border-right: 1px; width:50%;"><strong>Consignee(Ship to)<br/></strong><b>${record.entity}</b><br/>${record.shipaddress}<br/>GSTN/UIN: ${record.entity.defaulttaxreg}<br/>PAN/IT no : ${record.entity.custentity_permanent_account_number}<br /><#if record.entity.state?keep_after(\'-\') == "HP">State Name :Himachal Pradesh </#if> <#if record.entity.state?keep_after(\'-\') == "AN">State Name :Andaman and Nicobar Islands </#if><#if record.entity.state?keep_after(\'-\') == "AD">State Name :Andhra Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "AR">State Name :Arunachal Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "AS">State Name :Assam </#if><#if record.entity.state?keep_after(\'-\') == "BR">State Name :Bihar </#if><#if record.entity.state?keep_after(\'-\') == "CH">State Name :Chandigarh </#if><#if record.entity.state?keep_after(\'-\') == "CG">State Name :Chhattisgarh </#if><#if record.entity.state?keep_after(\'-\') == "DN">State Name :Dadra and Nagar Haveli </#if><#if record.entity.state?keep_after(\'-\') == "DD">State Name : Daman and Diu </#if><#if record.entity.state?keep_after(\'-\') == "DL">State Name : Delhi</#if><#if record.entity.state?keep_after(\'-\') == "GA">State Name : GOA </#if><#if record.entity.state?keep_after(\'-\') == "GJ">State Name : Gujarat </#if><#if record.entity.state?keep_after(\'-\') == "HR">State Name : Haryana </#if><#if record.entity.state?keep_after(\'-\') == "MP">State Name : Madhya Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "JK">State Name : Jammu and Kashmir </#if><#if record.entity.state?keep_after(\'-\') == "JH">State Name : Jharkhand </#if><#if record.entity.state?keep_after(\'-\') == "KA">State Name : Karnataka </#if><#if record.entity.state?keep_after(\'-\') == "KL">State Name : Kerala </#if> <#if record.entity.state?keep_after(\'-\') == "LA">State Name : Ladakh </#if> <#if record.entity.state?keep_after(\'-\') == "LD">State Name : Lakshdweep </#if> <#if record.entity.state?keep_after(\'-\') == "MH">State Name : Maharashtra </#if> <#if record.entity.state?keep_after(\'-\') == "MN">State Name : Manipur </#if> <#if record.entity.state?keep_after(\'-\') == "ML">State Name : Meghalaya </#if> <#if record.entity.state?keep_after(\'-\') == "MZ">State Name : Mizoram </#if><#if record.entity.state?keep_after(\'-\') == "NL">State Name : Nagaland </#if> <#if record.entity.state?keep_after(\'-\') == "OD">State Name : Odisha </#if> <#if record.entity.state?keep_after(\'-\') == "PY">State Name : Pondicherry </#if> <#if record.entity.state?keep_after(\'-\') == "PB">State Name : Punjab </#if> <#if record.entity.state?keep_after(\'-\') == "RJ">State Name : Rajasthan </#if><#if record.entity.state?keep_after(\'-\') == "SK">State Name : Sikkim </#if> <#if record.entity.state?keep_after(\'-\') == "TN">State Name : Tamil Nadu </#if> <#if record.entity.state?keep_after(\'-\') == "TS">State Name : Telangana </#if> <#if record.entity.state?keep_after(\'-\') == "TR">State Name : Tripura </#if> <#if record.entity.state?keep_after(\'-\') == "UP">State Name : Uttar Pradesh </#if> <#if record.entity.state?keep_after(\'-\') == "UK">State Name : Uttarakhand </#if><#if record.entity.state?keep_after(\'-\') == "WB">State Name : West Bengal </#if> , Code : ${record.entity.state?keep_before("-")}</td>'+
'<td class="address" style="align:left; border-bottom: 1px; border-right: 1px; width:25%;">Buyer\'s Order No.<br/><b>${record.otherrefnum}</b></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:25%;">Dated<br/><strong>${record.custbodycust_cus_po_date}</strong></td>'+
'</tr><tr>'+
'<td class="address" style="align:left; border-bottom: 1px; border-right: 1px; width:25%;">Dispatched Doc No.<br/> <b>${record.tranid}</b></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:25%;">delivery Note Date<br/><strong>${record.custbody12}</strong></td>'+
'</tr>'+
'<tr>'+
'<td class="address" style="align:left; border-bottom: 1px; border-right: 1px; width:25%;">Dispatched through <br/> <strong>${record.custbody_in_eway_transport_mode}</strong></td>'+
'<td class="address" style="align:left; border-bottom: 1px; width:25%;">Destination <br/><b> ${record.entity.city}</b></td>'+
'</tr>'+
'<tr>'+
'<td rowspan="2" class="address" style="align:left; border-top: 1px; border-right: 1px; width:50%;"><strong>Buyer(Bill to)<br/></strong><b>${record.entity}</b><br/>${record.shipaddress}<br/>GSTN/UIN: ${record.entity.defaulttaxreg}<br/>PAN/IT no : ${record.entity.custentity_permanent_account_number}<br /><#if record.entity.state?keep_after(\'-\') == "HP">State Name :Himachal Pradesh </#if> <#if record.entity.state?keep_after(\'-\') == "AN">State Name :Andaman and Nicobar Islands </#if><#if record.entity.state?keep_after(\'-\') == "AD">State Name :Andhra Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "AR">State Name :Arunachal Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "AS">State Name :Assam </#if><#if record.entity.state?keep_after(\'-\') == "BR">State Name :Bihar </#if><#if record.entity.state?keep_after(\'-\') == "CH">State Name :Chandigarh </#if><#if record.entity.state?keep_after(\'-\') == "CG">State Name :Chhattisgarh </#if><#if record.entity.state?keep_after(\'-\') == "DN">State Name :Dadra and Nagar Haveli </#if><#if record.entity.state?keep_after(\'-\') == "DD">State Name : Daman and Diu </#if><#if record.entity.state?keep_after(\'-\') == "DL">State Name : Delhi</#if><#if record.entity.state?keep_after(\'-\') == "GA">State Name : GOA </#if><#if record.entity.state?keep_after(\'-\') == "GJ">State Name : Gujarat </#if><#if record.entity.state?keep_after(\'-\') == "HR">State Name : Haryana </#if><#if record.entity.state?keep_after(\'-\') == "MP">State Name : Madhya Pradesh </#if><#if record.entity.state?keep_after(\'-\') == "JK">State Name : Jammu and Kashmir </#if><#if record.entity.state?keep_after(\'-\') == "JH">State Name : Jharkhand </#if><#if record.entity.state?keep_after(\'-\') == "KA">State Name : Karnataka </#if><#if record.entity.state?keep_after(\'-\') == "KL">State Name : Kerala </#if> <#if record.entity.state?keep_after(\'-\') == "LA">State Name : Ladakh </#if> <#if record.entity.state?keep_after(\'-\') == "LD">State Name : Lakshdweep </#if> <#if record.entity.state?keep_after(\'-\') == "MH">State Name : Maharashtra </#if> <#if record.entity.state?keep_after(\'-\') == "MN">State Name : Manipur </#if> <#if record.entity.state?keep_after(\'-\') == "ML">State Name : Meghalaya </#if> <#if record.entity.state?keep_after(\'-\') == "MZ">State Name : Mizoram </#if><#if record.entity.state?keep_after(\'-\') == "NL">State Name : Nagaland </#if> <#if record.entity.state?keep_after(\'-\') == "OD">State Name : Odisha </#if> <#if record.entity.state?keep_after(\'-\') == "PY">State Name : Pondicherry </#if> <#if record.entity.state?keep_after(\'-\') == "PB">State Name : Punjab </#if> <#if record.entity.state?keep_after(\'-\') == "RJ">State Name : Rajasthan </#if><#if record.entity.state?keep_after(\'-\') == "SK">State Name : Sikkim </#if> <#if record.entity.state?keep_after(\'-\') == "TN">State Name : Tamil Nadu </#if> <#if record.entity.state?keep_after(\'-\') == "TS">State Name : Telangana </#if> <#if record.entity.state?keep_after(\'-\') == "TR">State Name : Tripura </#if> <#if record.entity.state?keep_after(\'-\') == "UP">State Name : Uttar Pradesh </#if> <#if record.entity.state?keep_after(\'-\') == "UK">State Name : Uttarakhand </#if><#if record.entity.state?keep_after(\'-\') == "WB">State Name : West Bengal </#if> , Code : ${record.entity.state?keep_before("-")}</td>'+
'          '+
'       <td class="address"  height="5px" style="align:left; border-bottom: 1px; border-right: 1px; width:30%;">Bill of Landing/ LR-RR No. <br/> <b>${record.custbody3} ${record.custbody2}</b></td>'+
'<td class="address" height="5px" style="align:left; border-bottom: 1px; width:10%;">Motor Vehicle No. <br/><b>${record.custbody_in_eway_vehicle_no}</b></td>'+
'</tr>'+
'<tr>'+
'<td class="address" style="align:left; border-bottom: 0px; border-right: 0px; width:100%;">Terms of Delivery<br/>${record.terms}</td>'+
''+
'</tr><tr>'+
'<td class="address" style="align:left; border-bottom: 0px; border-right: 1px; width:20%;"><strong></strong><br/></td>'+
'<td class="address" style="align:left; border-bottom: 0px; width:20%;"><strong></strong><br/></td>'+
'</tr>'+
'<tr>'+
'<td class="address" style="align:left; border-right: 1px; width:20%;"><strong></strong></td>'+
'<td class="address" style="align:left; border-right: 0px; width:20%;"><strong></strong></td>'+
'</tr>'+
'  </table>'+
''+
''+
'<#if record.item?has_content>'+
' <table class="itemtable" border= "1" style="width:100%; border-top:0px"><!-- start items --><#assign cnt=0><#list record.item as item><#if item_index==0>'+
'  <tr class="itemline" style="border-bottom: 1px;">'+
'<td style="width: 6%;align:center;border-right: 1px;"><strong>Sl <br/>No.</strong></td>'+
'    <td style="width: 27%;align:center;border-right: 1px;"><strong>Description of Goods</strong></td>'+
'<td style="width: 13%;align:center;border-right: 1px;"><strong>HSN/<br/>SAC</strong></td>'+
'<td style="width: 10%;align:center;border-right: 1px;"><strong>GST<br />Rate</strong></td>'+
'<td style="width: 10%;align:center;border-right: 1px;"><strong>Qty</strong></td>'+
'<td style="width: 12%;align:center;border-right: 1px;"><strong>Rate</strong></td>'+
'<td style="width: 7%;align:center;border-right: 1px;"><strong>per</strong></td>'+
'<td style="width: 20%;align:center;border-top: 0px;"><strong>Amount</strong></td>'+
'</tr>'+
'  </#if>'+
'<#assign cnt=cnt + 1 >'+
'    <tr>'+
'<td style="align:center; border-right: 1px;">${cnt}</td>'+
'      <td style="align:left; border-right: 1px;">${item.item}<br/><#if item.inventorydetail?has_content><i>VIN No.</i>${item.inventorydetail}<br/><i>Motor No.</i>${item.custcol_engine_number}</#if></td>'+
'  <td style="align:left; border-right: 1px;">${item.custcol_in_hsn_code?keep_before("-")}</td>'+
'   <td style="align:left; border-right: 1px;">${item.custcol_in_hsn_code?keep_after("-")}</td>'+
'    <td style="align:right; border-right: 1px;">${item.quantity}</td>'+
'    <td style="align:right; border-right: 1px;">${item.rate}</td>'+
'      <td style="align:left; border-right: 1px;">${item.units}</td>'+
'    <td style="align:center; border-right: 0px;">${item.amount}</td>'+
'    </tr>'+
'    </#list>'+
''+
'  <#assign cgstTaxAmount=0>'+
'<#assign sgstTaxAmount=0>'+
'<#assign igstTaxAmount=0>'+
' <#assign itemtaxRate=0>'+
'<#assign itemtaxtype = \'\'>'+
'<#assign taxcollection=0>'+
'<#assign taxcollectionrate=0>'+
''+
'<#list record.taxdetails as taxdetails>'+
'<#assign itemtaxRate = taxdetails.taxrate>'+
'<#assign itemtaxRate = taxdetails.taxrate>'+
'<#assign itemtaxtype = taxdetails.taxtype>'+
'    <#if taxdetails.taxtype == "CGST">'+
'        <#assign cgstTaxAmount = cgstTaxAmount + taxdetails.taxamount>'+
'    </#if>'+
'    <#if taxdetails.taxtype == "SGST">'+
'        <#assign sgstTaxAmount = sgstTaxAmount + taxdetails.taxamount>'+
'    </#if> '+
'    <#if taxdetails.taxtype == "IGST">'+
'        <#assign igstTaxAmount = igstTaxAmount + taxdetails.taxamount>'+
'    </#if>'+
'    <#if taxdetails.taxtype == "Tax Collection at Source">'+
'        <#assign taxcollection = taxcollection + taxdetails.taxamount>'+
'        <#assign taxcollectionrate = taxdetails.taxrate>'+
'    </#if>'+
'</#list>'+
'<#if sgstTaxAmount != 0>'+
'<tr>'+
'    <td style="width: 35px;align:center; border-right: 1px;"></td>'+
'    <td style="width: 248px;align:left; border-right: 1px;"><b></b></td>'+
'    <td style="width: 93px;align:center; border-right: 1px;"><strong>SGST</strong></td>'+
'    <td style="width: 93px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 82px;align:center; border-right: 1px;"><b><br/></b></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:center; border-right: 0px;">${sgstTaxAmount}</td>'+
'</tr>'+
'</#if>'+
''+
'<#if igstTaxAmount != 0>'+
'<tr style="border-top: 0px;">'+
'    <td style="width: 35px;align:center; border-right: 1px;"></td>'+
'    <td style="width: 248px;align:left; border-right: 1px;"><b></b></td>'+
'    <td style="width: 93px;align:center; border-right: 1px;"><strong>IGST</strong></td>'+
'    <td style="width: 93px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 82px;align:center; border-right: 1px;"><b></b></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:center; border-right: 0px;"> ${igstTaxAmount}</td>'+
'</tr>'+
'</#if>'+
''+
'<#if cgstTaxAmount != 0>'+
'<tr style="border-top: 0px;">'+
'    <td style="width: 35px;align:center; border-right: 1px;"></td>'+
'    <td style="width: 248px;align:left; border-right: 1px;"><b></b></td>'+
'    <td style="width: 93px;align:center; border-right: 1px;"><strong>CGST</strong></td>'+
'    <td style="width: 93px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 82px;align:center; border-right: 1px;"><b></b></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:center; border-right: 0px;">${cgstTaxAmount}</td>'+
'</tr>'+
'</#if>'+
''+
'<#if taxcollection != 0>'+
'<tr style="border-top: 0px;">'+
'    <td style="width: 35px;align:center; border-right: 1px;"></td>'+
'    <td style="width: 248px;align:left; border-right: 1px;"><b></b></td>'+
'    <td style="width: 93px;align:center; border-right: 1px;"><strong>TCS</strong></td>'+
'    <td style="width: 93px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 82px;align:center; border-right: 1px;"><b>${taxcollectionrate}</b></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:left; border-right: 1px;"></td>'+
'    <td style="width: 91px;align:center; border-right: 0px;">${taxcollection}</td>'+
'</tr>'+
'</#if>  '+
''+
'<tr style="border-top: 1px;">'+
'<td style="width: 35px;align:center; border-right: 1px;"></td>'+
'<td style="width: 248px;align:left; border-right: 1px;"></td>'+
'<td style="width: 93px;align:right; border-right: 1px;">Total</td>'+
'<td style="width: 93px;align:left; border-right: 1px;"></td>'+
'<td style="width: 93px;align:left; border-right: 1px;"></td>'+
'<td style="width: 93px;align:left; border-right: 1px;"></td>'+
'<td style="width: 93px;align:left; border-right: 1px;"></td>'+
'<td style="width: 35px;align:center; border-right: 0px;">${record.total}</td>'+
'</tr>'+
'</table>'+
'    <table border="1" style="width:100%; border-top:0px">'+
'<tr>'+
'    <td colspan="250" style="width: 50px;align:left; border-right: 0px;">Amount Chargeable (in words) </td>'+
'      <td colspan="50" style="width: 50px; align:left; border-right: 0px;"><i>E.O.E</i></td>'+
'</tr>'+
'<tr>'+
' <td colspan="12" style="width: 35px; align:left; border-right: 0px;"><b>INR${record.custbody_amtinwrd}</b></td>'+
'</tr>'+
'    </table>'+
'  <#if itemtaxtype == "CGST" || itemtaxtype == "SGST" || itemtaxtype == "IGST" >'+
'  <table border="1" style="width:100%; border-top:0px">'+
''+
'    <tr>'+
'        <th rowspan="2" style="width: 23%; align:center; border-right: 1px;">HSN / SAC</th>'+
'        <th rowspan="2" style="width: 24%; align:center; border-right: 1px;">Taxable Value</th>'+
''+
'        <th colspan="2" style="width: 31%; align:center; border-right: 1px;">CGST</th>'+
''+
''+
'      <th colspan="2" style="width: 31%; align:center; border-right: 1px;">SGST/UTGST</th> '+
'      <th colspan="2" style="width: 31%; align:center; border-right: 1px;">IGST</th> '+

''+
'        <th rowspan="2" style="width: 22%; align:center;">Tax Amount</th>'+
'        '+
'    </tr>'+
''+
'    <tr>'+
'        <th style="width: 4%; align:center; border-right: 1px; border-top: 1px;">Rate</th>'+
'        <th style="width: 15%; align:center; border-right: 1px; border-top: 1px;">Amount</th>'+
'        <th style="width: 4%; align:center; border-right: 1px; border-top: 1px;">Rate</th>'+
'        <th style="width: 15%; align:center; border-right: 1px; border-top: 1px;">Amount</th>'+
'        <th style="width: 4%; align:center; border-right: 1px; border-top: 1px;">Rate</th>'+
'        <th style="width: 15%; align:center; border-right: 1px; border-top: 1px;">Amount</th>'+
'    </tr>';

getTaxDetails(rec_id)
var getFunction = getTaxDetails(rec_id);
var baseAmountTotal = 0;
var totalTaxAmt = 0;
var igstTotalAmt = 0;
var cgstTotalAmt = 0;
for(var taxCount = 0; taxCount<getFunction.length; taxCount++){
	baseAmountTotal = Number(baseAmountTotal + getFunction[taxCount].cgstbaseamount)
	var taxAmount = Number(getFunction[taxCount].cgsttaxamount + getFunction[taxCount].sgsttaxamount+ getFunction[taxCount].igsttaxamount)
	igstTotalAmt = Number(igstTotalAmt + getFunction[taxCount].igsttaxamount) 
	cgstTotalAmt =  Number(cgstTotalAmt + getFunction[taxCount].cgsttaxamount) 
	totalTaxAmt = totalTaxAmt + taxAmount
	var hsnCode = getFunction[taxCount].hsncode;
	var spliting = hsnCode.split("-");
	var hsnCodeValue = spliting[0]
xmlTemplateFile += '   <tr>'+
' <td style="align:left; border-right: 1px; border-top: 1px;">'+hsnCodeValue+'</td>'+
'<td style="align:center; border-right: 1px; border-top: 1px;">'+getFunction[taxCount].cgstbaseamount+'</td> '+
'  <td style="align:center; border-right: 1px; border-top: 1px;">'+getFunction[taxCount].cgstrate+'%</td>'+
'                <td style="align:center; border-right: 1px; border-top: 1px;"> '+getFunction[taxCount].cgsttaxamount+'</td>'+
'                  <td style="align:center; border-right: 1px; border-top: 1px;">'+getFunction[taxCount].sgstrate+'%</td>'+
'                <td style="align:center; border-right: 1px; border-top: 1px;"> '+getFunction[taxCount].sgsttaxamount+'</td>'+
'                  <td style="align:center; border-right: 1px; border-top: 1px;">'+getFunction[taxCount].igstrate+'%</td>'+
'                <td style="align:center; border-right: 1px; border-top: 1px;"> '+getFunction[taxCount].igsttaxamount+'</td>'+
'                <td style="align:center; border-right: 1px; border-top: 1px;">'+taxAmount+'</td>'+
'            </tr>';
}
xmlTemplateFile += ' <tr>'+
'        <td style="align:right; border-right: 1px; border-top: 1px;">Total</td>'+
'        <td style="align:center; border-right: 1px; border-top: 1px;">'+baseAmountTotal.toFixed(2)+'</td>'+
'        <td style="align:center; border-right: 1px; border-top: 1px;"></td>'+
'        <td style="align:center; border-right: 1px; border-top: 1px;">'+cgstTotalAmt.toFixed(2)+'</td>'+
'        <td style="align:center; border-right: 1px; border-top: 1px;"></td>'+
'               <td style="align:center; border-right: 1px; border-top: 1px;">'+cgstTotalAmt.toFixed(2)+'</td>'+
'        <td style="align:center; border-right: 1px; border-top: 1px;"></td>'+
'               <td style="align:center; border-right: 1px; border-top: 1px;">'+igstTotalAmt.toFixed(2)+'</td>'+
'        <td style="align:center; border-right: 0px; border-top: 1px;">'+totalTaxAmt.toFixed(2)+'</td>'+
'    </tr>'+
'</table>'+
' </#if>'+
'<table border="1">    '+
'         <tr>'+
'     <td colspan="12" style="width: 35px; align:left; border-right: 0px;">Tax Amount (In words)<b><br/><br/>INR${record.custbody_cin_tax_amount}</b></td>'+
'    </tr>'+
'        <tr><td colspan="12"><i>Remarks:</i><br/>${record.memo}<br/><br/>Company\'s PAN : <strong>AAFCE8587N</strong></td>'+
'          <td colspan="10">Company\'s Bank Details<br/>Bank Name : <strong>ICICI Bank Account</strong><br/>A/c No. : <strong>001305013478</strong> <br/>Branch IFS Code : <strong>Sector 9 Chandigarh ICIC0000013</strong></td>'+
'        </tr>'+
'    <tr>'+
'    <td colspan="12" style="align:left; width:100%;"><u>Declaration :</u> <br/> We declare that this invoice shows the actual price of the <br/>goods and services described and that all particulars are true and correct.</td>'+
'    <td colspan="10" style="text-align: right; border-top: 2px; border-left: 1px;"><strong>For Evage Mobility Private Limited</strong><br/><br/>Authorized Signatory</td>'+
'    </tr>'+
'    </table>'+
'          '+
'</#if>'+
'</body>'+
'</#list>'+
'</pdf>';


        var tpl = xmlTemplateFile;
        var renderer = render.create();
        renderer.templateContent = tpl;
        log.debug({
            title: 'renderer',
            details: renderer
        });
        renderer.addRecord('record',deposit_rec)
        var invoicePdf = renderer.renderAsPdf();
        context.response.writeFile({
            file: invoicePdf,
            isInline: true
        });
		
		function getTaxDetails(rec_id) {
	  //log.debug('getAssemblyItem in assembly item',getAssemblyItemAll);
      return query.runSuiteQL(`
        
 SELECT "HSNCODE"
,SUM("CGSTRate") "CGSTRate", SUM("CGSTBaseAmount") "CGSTBaseAmount",SUM("CGSTTaxAmount")*-1 "CGSTTaxAmount"
, SUM("SGSTRate") "SGSTRate",SUM("SGSTBaseAmount") "SGSTBaseAmount",SUM("SGSTTaxAmount")*-1 "SGSTTaxAmount"
,SUM("IGSTRate") "IGSTRate",SUM("IGSTBaseAmount") "IGSTBaseAmount",SUM("IGSTTaxAmount")*-1 "IGSTTaxAmount"
FROM
 
(SELECT BUILTIN.DF(T1.custcol_in_hsn_code) "HSNCODE"
,(T0.taxrate*100) "CGSTRate",SUM(T0.taxbasis) "CGSTBaseAmount",sum(T0.taxamount) "CGSTTaxAmount" 
, 0 "SGSTRate",0 "SGSTBaseAmount", 0 "SGSTTaxAmount"
, 0 "IGSTRate",0 "IGSTBaseAmount", 0 "IGSTTaxAmount"
 
FROM transactiontaxdetail T0 INNER JOIN TransactionLine  T1 ON T0.transaction=T1.transaction AND T0.line=t1.id --and T0.linename=BUILTIN.DF(T1.item)
WHERE T0.transaction=${rec_id} AND t1.custcol_in_hsn_code IS NOT NULL and taxtype=3
Group By BUILTIN.DF(T1.custcol_in_hsn_code),T0.taxrate,T0.taxtype
 
UNION ALL
 
SELECT BUILTIN.DF(T1.custcol_in_hsn_code) "HSNCODE"
,0 "CGSTRate",0 "CGSTBaseAmount",0 "CGSTTaxAmount" 
, (T0.taxrate*100) "SGSTRate",SUM(T0.taxbasis) "SGSTBaseAmount", sum(T0.taxamount) "SGSTTaxAmount"
, 0 "IGSTRate",0 "IGSTBaseAmount", 0 "IGSTTaxAmount"
 
FROM transactiontaxdetail T0 INNER JOIN TransactionLine  T1 ON T0.transaction=T1.transaction AND T0.line=t1.id --and T0.linename=BUILTIN.DF(T1.item)
WHERE T0.transaction=${rec_id} AND t1.custcol_in_hsn_code IS NOT NULL and taxtype=4
Group By BUILTIN.DF(T1.custcol_in_hsn_code),T0.taxrate,T0.taxtype
 
UNION ALL
 
SELECT BUILTIN.DF(T1.custcol_in_hsn_code) "HSNCODE"
,0 "CGSTRate",0 "CGSTBaseAmount",0 "CGSTTaxAmount" 
, 0 "SGSTRate", 0 "SGSTBaseAmount", 0 "SGSTTaxAmount"
, (T0.taxrate*100) "IGSTRate",SUM(T0.taxbasis) "IGSTBaseAmount",sum(T0.taxamount) "IGSTTaxAmount"
 
FROM transactiontaxdetail T0 INNER JOIN TransactionLine  T1 ON T0.transaction=T1.transaction AND T0.line=t1.id --and T0.linename=BUILTIN.DF(T1.item)
WHERE T0.transaction=${rec_id} AND t1.custcol_in_hsn_code IS NOT NULL and taxtype=2
Group By BUILTIN.DF(T1.custcol_in_hsn_code),T0.taxrate,T0.taxtype) 
Group By "HSNCODE"
`).asMappedResults();
		
		}	
		
    }
    return {
        onRequest: onRequest
    }
});