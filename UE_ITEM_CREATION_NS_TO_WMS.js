	/**
	 * @NApiVersion 2.x
	 * @NScriptType UserEventScript
	 * @NModuleScope SameAccount
	 */

	/*
	 * Script Author:		Chetu India Pvt. Ltd.
	 * Script Date:			April 14 , 2022
	 * Script Type:			SuiteScript 2.X
	 * Script Description:	
	 * Last Modified:	(Please put a comment below with details of modification)
	 * Comments:				
	 */
	define(['N/record','N/search','N/https','N/url','./easyWMS/authentication'],
	function(record,search,https,url,authentication) {
		
		/****start to create an item in EasyWMS****/
		
		//*For variables that reference fields which reference lists we need to get the "Name" field attached to the Internal ID we might need to use N/search as well - VG*//
		
		function afterSubmit(scriptcontext) {
			try {
				//****start to get the value of item fields****//
				var type = scriptcontext.type;
				log.debug('type',type);
				
				if( type === 'create'){
				var itemRecord = scriptcontext.newRecord;
				log.debug('itemRecord',itemRecord);
				var itemInternalId =  scriptcontext.newRecord.id;
				
				log.debug('itemInternalId',itemInternalId);
				var itemName = itemRecord.getValue({
					 fieldId : 'itemid'
					 });
				
				var eanCode = itemRecord.getValue({
					fieldId : 'custitem_ean13'
				});
				log.debug('eanCode',eanCode);
				var stockDescription =  itemRecord.getValue({
					fieldId : 'stockdescription'
					});
				log.debug('stockDescription',stockDescription);
				
				var  productTypeCode =  itemRecord.getText({
					fieldId : 'custitemproducttypecode'
					});
				log.debug('productTypeCode',productTypeCode);
				
				var  logisticProfileCode =  itemRecord.getText({
					fieldId : 'custitemlogisticprofilecode'
					});
				log.debug('logisticProfileCode',logisticProfileCode);
				var  receptionProfileCode =  itemRecord.getText({
					fieldId : 'custitemreceptionprofilecode'
					});
				log.debug('receptionProfileCode',receptionProfileCode);
				
				var primaryStockUnit = itemRecord.getValue({
					fieldId :'stockunit'
				});
				log.debug('primaryStockUnit',primaryStockUnit);
				/*UPC Code in NS is not Code in EasyWMS item Name is, we will review the mapping, UPC code= EAN code
				Changed the variable to NAME- VG*/
				var purchaseDescription =  itemRecord.getValue({
					fieldId : 'purchasedescription'
					});
					log.debug('purchaseDescription',purchaseDescription);
					
				var salesDescription =  itemRecord.getValue({
					fieldId : 'salesdescription'
					});
				log.debug('salesDescription',salesDescription);
				
				var shippingMethod =  itemRecord.getValue({
					fieldId : 'custitemitemshipmethod'
					});
				log.debug('shippingMethod',shippingMethod);
				
				var familyCode = itemRecord.getValue({
					fieldId : 'custitem_item_family'
				}); /*Created value for item family to match ProductFamilyCode*/
				log.debug("custitem_item_family", familyCode); 
				
				var itemWeight = itemRecord.getValue({
					fieldId : 'weight'
				});
				log.debug("itemWeight", itemWeight);
				
				var itemWidth = itemRecord.getValue({
					fieldId : 'custitem_width_mm'
				});
				log.debug("itemWidth", itemWidth);
				
				var itemHeight = itemRecord.getValue({
					fieldId : 'custitem_height_mm'
				});
				log.debug("itemHeight", itemHeight);
				
				var itemLength = itemRecord.getValue({
					fieldId : 'custitem_length_mm'
				});
				log.debug("itemLength", itemLength);
			//*Neeeds to get the NAME related to the value this variable gets - VG*//
				
				var jsonDataCreate = JSON.stringify([{
						  "Id":itemInternalId,/*NEEDS TO BE AN AUTOINCREMENTAL ID - VG*/
						  "Name":"Mecalux.ITSW.EasyWMS.Modules.MasterData.Contracts.Commands.ProductErpCommand, Mecalux.ITSW.EasyWMS.Modules.Contracts",
						  "Properties":{
							 "IgnoreNulls":1,
							 "Operation":0,
							 "Code": itemName,
							 "OwnerCode": "WallBox",/*Ownercode not defined in NetSuite leave as WallBox string - VG*/ 
							 "Data.UoMBaseCode":primaryStockUnit,/*Neeeds to get the NAME related to the value this variable gets - VG*/
							 "Data.ProductTypeCode":productTypeCode,
							 "Data.Profiles.LogisticProfileCode":logisticProfileCode,
							 "Data.Profiles.ReceptionProfileCode":receptionProfileCode,
							 "Data.Profiles.ShippingProfileCode": shippingMethod,
							 "Data.AllowCommingle":true,
							 "Data.AllowCrossdocking":true,
							 "Data.AlternativeDescription": salesDescription,
							 "Data.ImageName":"65\/fotos\/654798.jpg",/*Needs to match the field custitem_photo if possible (complicated, not expected now) - VG*/
							 "Data.TransactionalAliasList":true,
							 "Data.AliasList":[
								{
								   "Operation":0,
								   "Code": itemName
								}
							 ],
							 "Data.CompleteConversionList":true,
							 "Data.TransactionalConversionList":true,
							 "Data.ConversionList":[
								{
								   "Operation":0,
								   "UoMCode":"UN",
								   "Quantity":2,
								   "Weight":itemWeight,/*NS FIELD weight - VG*/
								   "Dimensions":{
									  "Weight":itemWeight, /*NS FIELD weight - VG*/
									  "Width":itemWidth, /*NS FIELD custitem_width_mm - VG*/
									  "Height":itemHeight,/*NS FIELD custitem_height_mm - VG*/
									  "Length":itemLength /*NS FIELD custitem_length_mm - VG*/
								   }
								}
							 ],
							 "Data.ProductFamilyCode":familyCode, /*Neeeds to get the NAME related to the value this variable gets - VG*/
							 "Data.Description": purchaseDescription
						  }
					}]);
				}
				else if( type === 'edit'){
					log.debug('itemInternalId',itemInternalId);
					var itemInternalId =  scriptcontext.newRecord.id;
				log.debug('itemInternalId',itemInternalId);
				var itemRecord = scriptcontext.newRecord;
				log.debug('itemRecord',itemRecord);
				var primaryStockUnit = itemRecord.getValue({
					fieldId :'stockunit',
					});
				log.debug('primaryStockUnit',primaryStockUnit);
				var eanCode = itemRecord.getValue({
					fieldId : 'custitem_ean13'
					});
				log.debug('eanCode',eanCode);
				var stockDescription =  itemRecord.getValue({
					fieldId : 'stockdescription'
					});
				log.debug('stockDescription',stockDescription);
					
				var  productTypeCode =  itemRecord.getText({
					fieldId : 'custitemproducttypecode'
					});
				log.debug('productTypeCode',productTypeCode);
				
				var  logisticProfileCode =  itemRecord.getText({
					fieldId : 'custitemlogisticprofilecode'
					});
				log.debug('logisticProfileCode',logisticProfileCode);
				var  receptionProfileCode =  itemRecord.getText({
					fieldId : 'custitemreceptionprofilecode'
					});
				log.debug('receptionProfileCode',receptionProfileCode);
				
				var purchaseDescription =  itemRecord.getValue({
					fieldId : 'purchasedescription'
					});
					log.debug('purchaseDescription',purchaseDescription);
					
				var salesDescription =  itemRecord.getValue({
					fieldId : 'salesdescription'
					});
				log.debug('salesDescription',salesDescription);
				
				var shippingMethod =  itemRecord.getValue({
					fieldId : 'custitemitemshipmethod'
					});
				log.debug('shippingMethod',shippingMethod);
				
				var familyCode = itemRecord.getValue({
					fieldId : 'custitem_item_family'
				});
				log.debug("custitem_item_family", familyCode); 
				var itemWeight = itemRecord.getValue({
					fieldId : 'weight'
				});
				log.debug("itemWeight", itemWeight);
				
				var itemWidth = itemRecord.getValue({
					fieldId : 'custitem_width_mm'
				});
				log.debug("itemWidth", itemWidth);
				
				var itemHeight = itemRecord.getValue({
					fieldId : 'custitem_height_mm'
				});
				log.debug("itemHeight", itemHeight);
				
				var itemLength = itemRecord.getValue({
					fieldId : 'custitem_length_mm'
				});
				log.debug("itemLength", itemLength);
				
				var jsonDataCreate = JSON.stringify([{
						  "Id":itemInternalId,
						  "Name":"Mecalux.ITSW.EasyWMS.Modules.MasterData.Contracts.Commands.ProductErpCommand, Mecalux.ITSW.EasyWMS.Modules.Contracts",
						  "Properties":{
							 "IgnoreNulls":1,
							 "Operation": 1,
							 "Code": itemName,
							 "OwnerCode": "WallBox",
							 "Data.UoMBaseCode":primaryStockUnit,
							 "Data.ProductTypeCode":productTypeCode,
							 "Data.Profiles.LogisticProfileCode":logisticProfileCode,
							 "Data.Profiles.ReceptionProfileCode":receptionProfileCode,
							 "Data.Profiles.ShippingProfileCode": shippingMethod,
							 "Data.AllowCommingle":true,
							 "Data.AllowCrossdocking":true,
							 "Data.AlternativeDescription": salesDescription,
							 "Data.ImageName":"65\/fotos\/654798.jpg",
							 "Data.TransactionalAliasList":true,
							 "Data.AliasList":[
								{
								   "Operation": 1,
								   "Code": itemName
								}
							 ],
							 "Data.CompleteConversionList":true,
							 "Data.TransactionalConversionList":true,
							 "Data.ConversionList":[
								{
								   "Operation": 1,
								   "UoMCode":"UN",
								   "Quantity":2,
								   "Weight":itemWeight,
								   "Dimensions":{
									  "Weight":itemWeight,
									  "Width":itemWidth,
									  "Height":itemHeight,
									  "Length":itemLength
								   }
								}
							 ],
							 "Data.ProductFamilyCode":familyCode,
							 "Data.Description": purchaseDescription
						  }
					}]);
					
				}
				else if( type ==='delete'){
					log.debug("Record Deleted");
					var jsonDataCreate = JSON.stringify([{
						  "Id":itemInternalId,
						  "Name":"Mecalux.ITSW.EasyWMS.Modules.MasterData.Contracts.Commands.ProductErpCommand, Mecalux.ITSW.EasyWMS.Modules.Contracts",
						  "Properties":{
							 "IgnoreNulls":1,
							 "Operation":2,
							 "Code": itemName,
							 "OwnerCode": "WallBox",
							 "Data.UoMBaseCode":primaryStockUnit,
							 "Data.ProductTypeCode":productTypeCode,
							 "Data.Profiles.LogisticProfileCode":logisticProfileCode,
							 "Data.Profiles.ReceptionProfileCode":receptionProfileCode,
							 "Data.Profiles.ShippingProfileCode": shippingMethod,
							 "Data.AllowCommingle":true,
							 "Data.AllowCrossdocking":true,
							 "Data.AlternativeDescription": salesDescription,
							 "Data.ImageName":"65\/fotos\/654798.jpg",
							 "Data.TransactionalAliasList":true,
							 "Data.AliasList":[
								{
								   "Operation":2,
								   "Code": itemName
								}
							 ],
							 "Data.CompleteConversionList":true,
							 "Data.TransactionalConversionList":true,
							 "Data.ConversionList":[
								{
								   "Operation":2,
								   "UoMCode":"UN",
								   "Quantity":2,
								   "Weight":itemWeight,
								   "Dimensions":{
									  "Weight":itemWeight,
									  "Width":itemWidth,
									  "Height":itemHeight,
									  "Length":itemLength
								   }
								}
							 ],
							 "Data.ProductFamilyCode":familyCode,
							 "Data.Description": purchaseDescription
						  }
					}]);
					
				}
				
			  //****end to get the value of item fields****//
			 
			  var postRequesttoken = authentication.getToken(); 
			  log.debug('postRequest token',postRequesttoken);
			  log.debug('postRequest token',postRequesttoken.body);
			  var accessTokendata = JSON.parse(postRequesttoken.body);
			  
			  log.debug('accessTokendata',accessTokendata);
			  var tokenId = accessTokendata.access_token;
			   var tokenType = accessTokendata.token_type;
			  
			  log.debug('tokenId',tokenId);
			  log.debug('tokenType',tokenType);
			  var tokenAuth = tokenType+ " "+ tokenId;
			  log.debug('tokenAuth',tokenAuth);
			  
			  
			  
			  //***end to create bearer token dynamic ***//
			  
			  //*****Start to POST the data from EasyWMS****//
				var itemBody = jsonDataCreate
					log.debug('itemBody', itemBody);
					var urlEndPoint = 'https://W17Stest.mss.mecalux.com/ApplicationService/api/CommandExecute'
					var postRequest = https.post({
						url: 'https://W17Stest.mss.mecalux.com/ApplicationService/api/CommandExecute',
							headers: {
							 "Authorization": tokenAuth,
							"Accept-Encoding" : "gzip, deflate, br",
							"Accept" : "*/*", 
							"Connection": "keep-alive",
							"Content-Type": "application/json"
						},

						body: itemBody

					});
					log.debug('postRequest',postRequest);
					log.debug('postRequest',postRequest.body);
					

			  
			  
			  //*****End to POST the data from EasyWMS****//
			  
				
				
			} catch (err) {
				log.debug("ERROR", err.message);
			}
		}
			/****End to create an item in EasyWMS****/

	return {

		afterSubmit: afterSubmit
	};
	});