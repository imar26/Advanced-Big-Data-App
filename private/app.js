module.exports = function (app, client) {

    // Strong Etag
    app.set('etag', 'strong');

    // Data Validation
    var Validator = require('jsonschema').Validator;
    var v = new Validator();

    // JSON Schema
    var schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "JSON Schema",
        "description": "JSON Schema for the Use Case",
        "type": "object",
        "properties": {
            "planCostShares": {
                "type": "object",
                "properties": {
                    "deductible": {
                        "type": "number"
                    },
                    "_org": {
                        "type": "string"
                    },
                    "copay": {
                        "type": "number"
                    },
                    "objectId": {
                        "type": "string"
                    },
                    "objectType": {
                        "type": "string"
                    }
                }
            },
            "linkedPlanServices": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "linkedService": {
                            "type": "object",
                            "properties": {
                                "_org": {
                                    "type": "string"
                                },
                                "objectId": {
                                    "type": "string"
                                },
                                "objectType": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                }
                            }
                        },
                        "planserviceCostShares": {
                            "type": "object",
                            "properties": {
                                "deductible": {
                                    "type": "number"
                                },
                                "_org": {
                                    "type": "string"
                                },
                                "copay": {
                                    "type": "number"
                                },
                                "objectId": {
                                    "type": "string"
                                },
                                "objectType": {
                                    "type": "string"
                                }
                            }
                        },
                        "_org": {
                            "type": "string"
                        },
                        "objectId": {
                            "type": "string"
                        },
                        "objectType": {
                            "type": "string"
                        }
                    }
                }
            },
            "_org": {
                "type": "string"
            },
            "objectId": {
                "type": "string"
            },
            "objectType": {
                "type": "string"
            },
            "planType": {
                "type": "string"
            },
            "creationDate": {
                "type": "string"
            }
        },
        "additionalProperties": false        
    };

    // Test data used initially for testing
    // var data = {
    //     "planCostShares": {
    //         "deductible": 20,
    //         "_org": "example.com",
    //         "copay": 10,
    //         "objectId": "1234vxc2324sdf",
    //         "objectType": "membercostshare"
    //     },
    //     "linkedPlanServices": [{
    //         "linkedService": {
    //             "_org": "example.com",
    //             "objectId": "1234520xvc30asdf",
    //             "objectType": "service",
    //             "name": "Yearly physical"
    //         },
    //         "planserviceCostShares": {
    //             "deductible": 10,
    //             "_org": "example.com",
    //             "copay": 175,
    //             "objectId": "1234512xvc1314asdfs",
    //             "objectType": "membercostshare"
    //         },
    //         "_org": "example.com",
    //         "objectId": "27283xvx9asdff",
    //         "objectType": "planservice"
    //     }, {
    //         "linkedService": {
    //             "_org": "example.com",
    //             "objectId": "1234520xvc30sfs",
    //             "objectType": "service",
    //             "name": "well baby"
    //         },
    //         "planserviceCostShares": {
    //             "deductible": 10,
    //             "_org": "example.com",
    //             "copay": 175,
    //             "objectId": "1234512xvc1314sdfsd",
    //             "objectType": "membercostshare"
    //         },

    //         "_org": "example.com",

    //         "objectId": "27283xvx9sdf",
    //         "objectType": "planservice"
    //     }],
    //     "_org": "example.com",
    //     "objectId": "12xvxc345ssdsds",
    //     "objectType": "plan",
    //     "planType": "inNetwork",
    //     "creationDate": "12-12-3000"
    // };

    // Rest API's
    app.get('/', function(req, res, next) {
        res.send('Hello from nodejs');
    });

    app.post('/plan', function(req, res, next) {
        const uuidv1 = require('uuid/v1');
        let _id = uuidv1();

        let addPlan = req.body;

        let errors = v.validate(addPlan, schema).errors;
        if (errors.length < 1) {

            for (let key in addPlan) {
                // check also if property is not inherited from prototype
                if (addPlan.hasOwnProperty(key)) {
                    let value = addPlan[key];
                    if(typeof(value) == 'object') {
                        if(value instanceof Array) {
                            for(let i=0; i<value.length; i++) {
                                let eachValue = value[i];
                                // console.log(eachValue);
                                for (let innerkey in eachValue) {
                                    if (eachValue.hasOwnProperty(innerkey)) {
                                        let innerValue = eachValue[innerkey];
                                        if(typeof(innerValue) == 'object') {
                                            client.hmset(_id + "-" + eachValue["objectType"]+"-"+eachValue["objectId"]+"-"+innerkey, innerValue, function(err, result) {
                                                if(err) {
                                                    console.log(err);
                                                }
                                            });
                                            // client.sadd(_id + "-" + eachValue["objectType"]+"-"+eachValue["objectId"]+"-"+innerkey, _id + "-" + innerValue["objectType"]+"-"+innerValue["objectId"]);                                            
                                        } else {
                                            client.hset(_id + "-" + eachValue["objectType"]+"-"+eachValue["objectId"], innerkey, innerValue, function(err, result) {
                                                if(err) {
                                                    console.log(err);
                                                }
                                            });
                                            client.sadd(_id + "-" + addPlan["objectType"]+"-"+addPlan["objectId"]+"-"+key, _id + "-" + eachValue["objectType"]+"-"+eachValue["objectId"]);                                            
                                        }
                                    }
                                }
                            }
                        } else {
                            for (let innerkey in value) {
                                let innerValue = value[innerkey];
                                client.hmset(_id + "-" + value["objectType"]+"-"+value["objectId"], value, function(err, result) {
                                    if(err) {
                                        console.log(err);
                                    }
                                });
                                // client.sadd(_id + "-" + addPlan["objectType"]+"-"+addPlan["objectId"]+"-"+key, _id + "-" + value["objectType"]+"-"+value["objectId"]);
                            }                            
                        }
                    } else {
                        client.hset(_id + "-" + addPlan["objectType"]+"-"+addPlan["objectId"], key, value, function(err, result) {
                            if(err) {
                                console.log(err);
                            }
                        });
                    }
                }
            }
            res.status(201).send("The key of the newly created plan is: " + _id);
        } else {
            var errorArray = [];
            for (let i = 0; i < errors.length; i++) {
                errorArray.push(errors[i].stack);
            }
            res.status(400).send(errorArray);
        }
    });

    app.get('/getAllPlans', function (req, res, next) {
        res.send('Displays all the plans.');
    });

    app.get('/plan/:planId', function(req, res, next) {
        let planId = req.params.planId;
        // console.log(planId);

        client.keys(planId+"*", function(err, result) {
            if(err) {
                console.log(err);
            }
            var finalResult = [];

            client.smembers("8a13fe60-23e1-11e8-b9c1-090d7ee5efa7-plan-12xvxc345ssdsds-planCostShares", function(error, output) {
                if(error) {
                    // console.log(error);
                }
                // console.log("Before Output");
                // console.log(output);
                console.log(output);
                for(let j=0; j<output.length; j++) {
                    console.log();
                }
                // if(output) {
                //     finalResult.push(output);
                // }
                // res.json(finalResult);
                // console.log(finalResult);

                // console.log("**********************************");
                // console.log("After Output");
            });

            // for(let i=0; i<result.length; i++) {
                // client.hgetall("8a13fe60-23e1-11e8-b9c1-090d7ee5efa7-plan-12xvxc345ssdsds", function(error, output) {
                //     if(error) {
                //         // console.log(error);
                //     }
                //     // console.log("Before Output");
                //     // console.log(output);
                //     // console.log(output);
                //     if(output) {
                //         finalResult.push(output);
                //     }
                //     res.json(finalResult[0]);
                //     // console.log(finalResult);

                //     // console.log("**********************************");
                //     // console.log("After Output");
                // });
            //     // console.log(finalResult);
            // }
            // console.log(finalResult);
            // res.json(finalResult);
        });
        // client.get(planId, function(err, result) {
        //     if(err) {
        //         console.log(err);
        //     }
        //     if(result) {
        //         res.json(JSON.parse(result));
        //     } else {
        //         res.sendStatus(404);
        //     }
        // });

        // client.hgetall(planId, function(err, result) {
        //     if(err) {
        //         console.log(err);
        //     }
        //     if(result) {
        //         res.json(result);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // });
    });

    app.delete('/deletePlan/:planId', function(req, res, next) {
        let planId = req.params.planId;
        client.del(planId, function(err, result) {
            if(err) {
                console.log(err);
            }
            if(result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    });

    // Another way to validate Data with JSON Schema
    // var validate = require('jsonschema').validate;
    // console.log(validate(p, schema));

    // Temporarily commented out (Validating with hardcoded data)
    // console.log(v.validate(data, schema));

};