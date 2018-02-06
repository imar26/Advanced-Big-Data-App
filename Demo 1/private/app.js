module.exports = function (app) {

    // Data Validation
    var Validator = require('jsonschema').Validator;
    var v = new Validator();

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
        }        
    };

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
        var data = {
            text: 'Hello from nodejs'
        };
        res.json(data);
    });

    app.post('/plan/add', function(req, res, next) {
        const uuidv1 = require('uuid/v1');
        let _id = uuidv1();

        let addPlan = req.body;
        

        let errors = v.validate(addPlan, schema).errors;
        if(errors.length < 1) {
            console.log(addPlan);
        } else {
            for(let i=0; i<errors.length; i++) {
                console.log(errors[i].stack);
            }
        }
    });

    // var validate = require('jsonschema').validate;

    // Temporarily commented out
    // console.log(v.validate(data, schema));

    // console.log(validate(p, schema));
};