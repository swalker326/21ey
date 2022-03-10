export const schema = {
    "models": {
        "Goal": {
            "name": "Goal",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "GoalStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "daysCompleted": {
                    "name": "daysCompleted",
                    "isArray": true,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdOn": {
                    "name": "createdOn",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedOn": {
                    "name": "updatedOn",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Goals",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": {
                            "create": "createGoal",
                            "delete": "deleteGoal",
                            "update": "updateGoal"
                        },
                        "timestamps": {
                            "createdAt": "createdOn",
                            "updatedAt": "updatedOn"
                        },
                        "subscriptions": {
                            "level": "public"
                        }
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "GoalStatus": {
            "name": "GoalStatus",
            "values": [
                "ACTIVE",
                "COMPLETED",
                "FAILED"
            ]
        }
    },
    "nonModels": {},
    "version": "572e1841ab99f741d7a28c895dd2d119"
};