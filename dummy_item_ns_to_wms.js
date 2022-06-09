                /**
                * @NApiVersion 2.x
                * @NScriptType UserEventScript
                * @NModuleScope SameAccount
                */

                /*
                * Script Author:                               Chetu India Pvt. Ltd.
                * Script Date:                                    April 14 , 2022
                * Script Type:                                    SuiteScript 2.X
                * Script Description:       
                * Last Modified:              (Please put a comment below with details of modification)
                * Comments:                                                    
                */
                define(['N/record', 'N/search', 'N/https', 'N/url', './easyWMS/authentication'],
                    function(record, search, https, url, authentication) {

                        //****start to create an item in EasyWMS****//

                        function afterSubmit(scriptcontext) {
                            try {
                                //****start to get the value of item fields****//
                                var type = scriptcontext.type;
                                log.debug('type', type);
                                var itemRecord1 = scriptcontext.newRecord;
                                log.debug('itemRecord1', itemRecord1);
                                var itemInternalId = scriptcontext.newRecord.id;
                                log.debug('itemInternalId', itemInternalId);
								var itemType = itemRecord1.type;
								log.debug('itemType',itemType);
								var itemRecord = record.load({
									type : itemType,
									id: itemInternalId
								});
								 log.debug('itemRecord', itemRecord);
                                var itemName = itemRecord.getValue({
                                    fieldId: 'itemid'
                                });
                                var eanCode = itemRecord.getValue({
                                    fieldId: 'custitem_ean13'
                                });
                                log.debug('eanCode', eanCode);
                                var stockDescription = itemRecord.getValue({
                                    fieldId: 'stockdescription'
                                });
                                log.debug('stockDescription', stockDescription);
                                var productTypeCode = itemRecord.getText({
                                    fieldId: 'custitemproducttypecode'
                                });
								
                                log.debug('productTypeCode', productTypeCode);
                                var logisticProfileCode = itemRecord.getText({
                                    fieldId: 'custitemlogisticprofilecode'
                                });
                                log.debug('logisticProfileCode', logisticProfileCode);
                                var receptionProfileCode = itemRecord.getText({
                                    fieldId: 'custitemreceptionprofilecode'
                                });
                                log.debug('receptionProfileCode', receptionProfileCode);
                                var primaryStockUnit = itemRecord.getValue({
                                    fieldId: 'stockunit'
                                });
                                log.debug('primaryStockUnit', primaryStockUnit);
                                var purchaseDescription = itemRecord.getValue({
                                    fieldId: 'purchasedescription'
                                });
                                log.debug('purchaseDescription', purchaseDescription);
                                var salesDescription = itemRecord.getValue({
                                    fieldId: 'salesdescription'
                                });
                                log.debug('salesDescription', salesDescription);
                                var shippingMethod = itemRecord.getValue({
                                    fieldId: 'custitemitemshipmethod'
                                });
                                log.debug('shippingMethod', shippingMethod);
                                var familyCode = itemRecord.getText({
                                    fieldId: 'custitem_item_family'
                                });
                                log.debug("custitem_item_family", familyCode);
                                var itemWeight = itemRecord.getValue({
                                    fieldId: 'weight'
                                });
                                log.debug("itemWeight", itemWeight);
                                var itemWidth = itemRecord.getValue({
                                    fieldId: 'custitem_width_mm'
                                });
                                log.debug("itemWidth", itemWidth);
                                var itemHeight = itemRecord.getValue({
                                    fieldId: 'custitem_height_mm'
                                });
                                log.debug("itemHeight", itemHeight);
                                var itemLength = itemRecord.getValue({
                                    fieldId: 'custitem_length_mm'
                                });
                                log.debug("itemLength", itemLength);
                                //****end to get the value of item fields****//

                                //****this token authentication process in that code data will be get via library file****//
                                var postRequesttoken = authentication.getToken();
                                log.debug('postRequest token', postRequesttoken);
                                log.debug('postRequest token', postRequesttoken.body);
                                var accessTokendata = JSON.parse(postRequesttoken.body);

                                log.debug('accessTokendata', accessTokendata);
                                var tokenId = accessTokendata.access_token;
                                var tokenType = accessTokendata.token_type;

                                log.debug('tokenId', tokenId);
                                log.debug('tokenType', tokenType);
                                var tokenAuth = tokenType + " " + tokenId;
                                log.debug('tokenAuth', tokenAuth);
                                //***end of token authentication ***//

                                //***start to create or update or upsert of item***// 
                                if (type === "create" || type === "edit") {
                                    var jsonDataCreate = JSON.stringify([{
                                        "Id": itemInternalId,
                                        /*NEEDS TO BE AN AUTOINCREMENTAL ID - VG*/
                                        "Name": "Mecalux.ITSW.EasyWMS.Modules.MasterData.Contracts.Commands.ProductErpCommand, Mecalux.ITSW.EasyWMS.Modules.Contracts",
                                        "Properties": {
                                            "IgnoreNulls": 1,
                                            "Operation": 3,
                                            "Code": itemName,
                                            "OwnerCode": "WallBox",
                                            /*Ownercode not defined in NetSuite leave as WallBox string - VG*/
                                            "Data.UoMBaseCode": primaryStockUnit,
                                            /*Neeeds to get the NAME related to the value this variable gets - VG*/
                                            "Data.ProductTypeCode": productTypeCode,
                                            "Data.Profiles.LogisticProfileCode": logisticProfileCode,
                                            "Data.Profiles.ReceptionProfileCode": receptionProfileCode,
                                            "Data.Profiles.ShippingProfileCode": shippingMethod,
                                            "Data.AllowCommingle": true,
                                            "Data.AllowCrossdocking": true,
                                            "Data.AlternativeDescription": salesDescription,
                                            "Data.ImageName": "65\/fotos\/654798.jpg",
                                            /*Needs to match the field custitem_photo if possible (complicated, not expected now) - VG*/
                                            "Data.TransactionalAliasList": true,
                                            "Data.AliasList": [{
                                                "Operation": 3,
                                                "Code": itemName
                                            }],
                                            "Data.CompleteConversionList": true,
                                            "Data.TransactionalConversionList": true,
                                            "Data.ConversionList": [{
                                                "Operation": 3,
                                                "UoMCode": "UN",
                                                "Quantity": 2,
                                                "Weight": itemWeight,
                                                /*NS FIELD weight - VG*/
                                                "Dimensions": {
                                                    "Weight": itemWeight,
                                                    /*NS FIELD weight - VG*/
                                                    "Width": itemWidth,
                                                    /*NS FIELD custitem_width_mm - VG*/
                                                    "Height": itemHeight,
                                                    /*NS FIELD custitem_height_mm - VG*/
                                                    "Length": itemLength /*NS FIELD custitem_length_mm - VG*/
                                                }
                                            }],
                                            "Data.ProductFamilyCode": familyCode,
                                            /*Neeeds to get the NAME related to the value this variable gets - VG*/
                                            "Data.Description": purchaseDescription
                                        }
                                    }]);
                                    var itemBody = jsonDataCreate
                                    log.debug('itemBody', itemBody);
                                    var urlEndPoint = 'https://W17Stest.mss.mecalux.com/ApplicationService/api/CommandExecute'
                                    var postRequest = https.post({
                                        url: 'https://W17Stest.mss.mecalux.com/ApplicationService/api/CommandExecute',
                                        headers: {
                                            "Authorization": tokenAuth,
                                            "Accept-Encoding": "gzip, deflate, br",
                                            "Accept": "*/*",
                                            "Connection": "keep-alive",
                                            "Content-Type": "application/json"
                                        },

                                        body: itemBody

                                    });
                                    log.debug('postRequest', postRequest);
                                    log.debug('postRequest', postRequest.body);
                                }
                                //***end to create or update or upsert of item***// 

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

