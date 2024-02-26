
export const CUSTOMER_ADDRESS =
  {
    "ID": "NCTP-8563",
    "nextPageID": "Confirm",
    "messages": [
      {
        "messageDescription": "The API returned Success Message",
        "messageType": "RFC",
        "Status": "200",
        "Title": "Success"
      },
      {
        "messageDescription": "https://www.fidiumfiber.com/terms-policies",
        "messageType": "Terms and Conditions"
      },
      {
        "messageDescription": "https://www.fidiumfiber.com/Terms-Policies/Online-Ordering-Terms-Conditions",
        "messageType": "Terms and Conditions"
      }
    ],
    "response": {
      "eligibleAddresses": [
        {
          "addressId": "2395A8C7336B8F369A3F440F7B6562AE",
          "addressLine1": "101 ALLARD DR",
          "controlNumber": "50009541",
          "locality": "MANCHESTER",
          "market": "NNE",
          "state": "NH",
          "zipCode": "03102"
        }
      ]
    },
    "eTag": "20230823T220235.113 GMT"
}

export const CUSTOMER_MULTI_ADDRESS =
  {
    "ID": "NCTP-8558",
    "nextPageID": "Confirm",
    "messages": [
      {
        "messageDescription": "The API returned Success Message",
        "messageType": "RFC",
        "Status": "200",
        "Title": "Success"
      },
      {
        "messageDescription": "https://www.fidiumfiber.com/terms-policies",
        "messageType": "Terms and Conditions"
      },
      {
        "messageDescription": "https://www.fidiumfiber.com/Terms-Policies/Online-Ordering-Terms-Conditions",
        "messageType": "Terms and Conditions"
      }
    ],
    "response": {
      "eligibleAddresses": [
        {
          "addressId": "D23C3AFE6BDC896B277F4F91CFE0F756",
          "addressLine1": "233 MACARIO CT",
          "addressLine2": "APT 2",
          "controlNumber": "140647",
          "locality": "ROSEVILLE",
          "market": "CAL",
          "state": "CA",
          "zipCode": "95678"
        },
        {
          "addressId": "A0E728E0A0F5176C8146F17A665EE7D7",
          "addressLine1": "233 MACARIO CT",
          "addressLine2": "APT 4",
          "controlNumber": "140649",
          "locality": "ROSEVILLE",
          "market": "CAL",
          "state": "CA",
          "zipCode": "95678"
        },
        {
          "addressId": "3AFBA81AF63CF0358D062DCE556C84BB",
          "addressLine1": "233 MACARIO CT",
          "addressLine2": "APT 3",
          "controlNumber": "140648",
          "locality": "ROSEVILLE",
          "market": "CAL",
          "state": "CA",
          "zipCode": "95678"
        },
        {
          "addressId": "25C2B5D26320A6AB7C93A7A6F6E0606B",
          "addressLine1": "233 MACARIO CT",
          "addressLine2": "APT 1",
          "controlNumber": "140646",
          "locality": "ROSEVILLE",
          "market": "CAL",
          "state": "CA",
          "zipCode": "95678"
        }
      ]
    },
    "eTag": "20230823T163042.019 GMT"
}

export const PRODUCTS_EARTHLINK = {
  "messages": [
    {
      "messageDescription": "The API returned Success Message",
      "messageType": "RFC",
      "Status": "200",
      "Title": "Success"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/terms-policies",
      "messageType": "Terms and Conditions"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/Terms-Policies/Online-Ordering-Terms-Conditions",
      "messageType": "Terms and Conditions"
    }
  ],
  "response": {
    "eligibility": {
      "activeServiceExist": "No",
      "addressSelected": "101  ALLARD DR  MANCHESTER NH 03102-4007",
      "caseNumber": "NCTP-8413",
      "controlNumber": "50009541",
      "fidiumEligibility": "Fidium Eligible",
      "transactionId": "NCTP-8413-7d4dbbd0-52bd-4083-a",
      "vendorCanSell": "Yes"
    },
    "internetPlansList": [
      {
        "CategoryName": "PLAN",
        "Description": "Stream higher definition 4K content\n No Data cap\n No Bandwidth or speed throttling\n Supports multiple devices at one time\n Wireless router included",
        "PlanName": "2 Gig",
        "ProductType": "INTERNET",
        "recurringAmount": "75.0",
        "ServicePlanName": "FID-2G"
      },
      {
        "CategoryName": "PLAN",
        "Description": "Supports 5+ devices at one time\n Wireless router included\n Stream higher definition 4K content\n No Data caps\n No bandwidth or speed throttling\n No Contract",
        "PlanName": "1 Gig",
        "ProductType": "INTERNET",
        "recurringAmount": "55.0",
        "ServicePlanName": "FID-1G"
      },
      {
        "CategoryName": "PLAN",
        "Description": "Supports 4-5 devices at one time\n Wireless router included\n Stream higher definition 4K content\n No Data caps\n No bandwidth or speed throttling\n No contract",
        "PlanName": "250 Mbps",
        "ProductType": "INTERNET",
        "recurringAmount": "60.0",
        "ServicePlanName": "FID-250M"
      },
      {
        "CategoryName": "PLAN",
        "Description": "Supports 3-4 devices at one time\n Wireless router included\n No Data caps\n No bandwidth or speed throttling\n No contract",
        "PlanName": "50 Mbps",
        "ProductType": "INTERNET",
        "recurringAmount": "35.0",
        "ServicePlanName": "FID-50M"
      }
    ],
    "securityQuestionsList": [
      {
        "id": "SQ-12",
        "question": "What is your favorite pet's name?"
      },
      {
        "id": "SQ-13",
        "question": "Where is your favorite place to vacation?"
      },
      {
        "id": "SQ-14",
        "question": "Who was your favorite teacher?"
      },
      {
        "id": "SQ-15",
        "question": "What was your first automobile?"
      },
      {
        "id": "SQ-16",
        "question": "Who is your best friend?"
      }
    ],
    "voicePlansList": [
      {
        "CategoryName": "PLAN",
        "Description": "Unlimited Local, Nationwide and international calls to Canada, U.S. Virgin Islands, Guam, Puerto Rico and Mariana Islands.\n Voicemail, on your phone and in your inbox\n Call Forwarding to any phone or device\n Call Waiting & Caller ID\n Block spam or anonymously reject calls\n Automatic Callback",
        "PlanName": "VoIP Unlimited",
        "ProductType": "VOICE",
        "recurringAmount": "15.0",
        "ServicePlanName": "FID-HVOIP"
      }
    ]
  },
  "eTag": "20230814T133222.734 GMT"
}

export const APPOINTMENT_OPTIONS = {
  "messages": [
    {
      "messageDescription": "Your quoted price includes a Paperless Billing discount of $2.50. If you prefer a paper bill in the mail, you can switch by visiting the Fidium Insider Customer Portal at Fidium.net after your service is installed. If you make the switch to receiving a paper bill you will no longer receive the discount.",
      "messageType": "Coaching Tip"
    },
    {
      "messageDescription": "Your quoted price includes an Auto-Pay discount of $2.50. Please visit the Fidium Insider Customer Portal after installation to enroll in Auto-Pay to keep this $2.50 discount. This discount will apply to the first full billing cycle after you enroll.",
      "messageType": "Coaching Tip"
    },
    {
      "messageDescription": "Depending on your service activation date, your first bill may include a partial month's charge in addition to charges for your first full month.",
      "messageType": "Coaching Tip"
    },
    {
      "messageDescription": "Order Contact is the person meeting the technician. The person must be 18 years of age or older and present at the time of installation to allow technician access.",
      "messageType": "Coaching Tip"
    },
    {
      "messageDescription": "The API returned Success Message",
      "messageType": "RFC",
      "Status": "200",
      "Title": "Success"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/terms-policies",
      "messageType": "Terms and Conditions"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/Terms-Policies/Online-Ordering-Terms-Conditions",
      "messageType": "Terms and Conditions"
    }
  ],
  "response": {
    "MRCAmount": "70.0",
    "NRCAmount": "0.0",
    "OrderNumber": "1-26551659402",
    "subTotalOfInternet": "55.0",
    "subTotalOfVoice": "15.0",
    "appointments": [
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230820",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230820",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230820",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230820",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230820",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230821",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230821",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230821",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230821",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230821",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230822",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230822",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230822",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230822",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230822",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230823",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230823",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230823",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230823",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230823",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230824",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230824",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230824",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230824",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230824",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230825",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230825",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230825",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230825",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230825",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230826",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230826",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230826",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230826",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230827",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230827",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230827",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230827",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230827",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230828",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230828",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230828",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230828",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230828",
        "scheduleEndTime": "1900"
      },
      {
        "appointmentWindowId": "2677",
        "scheduleBeginTime": "800",
        "scheduleDateOfInstallation": "20230829",
        "scheduleEndTime": "1000"
      },
      {
        "appointmentWindowId": "2678",
        "scheduleBeginTime": "1000",
        "scheduleDateOfInstallation": "20230829",
        "scheduleEndTime": "1200"
      },
      {
        "appointmentWindowId": "2679",
        "scheduleBeginTime": "1300",
        "scheduleDateOfInstallation": "20230829",
        "scheduleEndTime": "1500"
      },
      {
        "appointmentWindowId": "2680",
        "scheduleBeginTime": "1500",
        "scheduleDateOfInstallation": "20230829",
        "scheduleEndTime": "1700"
      },
      {
        "appointmentWindowId": "2681",
        "scheduleBeginTime": "1700",
        "scheduleDateOfInstallation": "20230829",
        "scheduleEndTime": "1900"
      }
    ],
    "thirdPartyCart": {
      "monthlyCharges": [
        {
          "itemDescription": "AutoPay Discount",
          "itemRate": "-2.5",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "Paperless Bill Discount",
          "itemRate": "-2.5",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "$40 Fiber Int Discount",
          "itemRate": "-40.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "1G Fiber Internet",
          "itemRate": "90.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "Network Care",
          "itemRate": "10.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "International Call Blocking",
          "itemRate": "0.0",
          "ProductType": "VOICE"
        },
        {
          "itemDescription": "VOIP Unlimited",
          "itemRate": "15.0",
          "ProductType": "VOICE"
        }
      ],
      "oneTimeCharges": [
        {
          "itemDescription": "Fib Int Prof Install",
          "itemRate": "199.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "Fib Int Prof Inst Waiver",
          "itemRate": "-199.0",
          "ProductType": "INTERNET"
        }
      ]
    }
  },
  "eTag": "20230817T155628.544 GMT"
}

export const APPOINTMENT_OPTIONS_NO_APPOINTMENTS = {
  "messages": [
    {
      "messageDescription": "There is a potential customer match with an outstanding balance, you will be contacted within 48 hours to complete the order. Order # 0052830095",
      "messageType": "Coaching Tip"
    },
    {
      "messageDescription": "The API returned Success Message",
      "messageType": "RFC",
      "Status": "200",
      "Title": "Success"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/terms-policies",
      "messageType": "Terms and Conditions"
    },
    {
      "messageDescription": "https://www.fidiumfiber.com/Terms-Policies/Online-Ordering-Terms-Conditions",
      "messageType": "Terms and Conditions"
    }
  ],
  "response": {
    "emailAddress": "wsdfgasdfasd@gmail.com",
    "MRCAmount": "70.00",
    "NRCAmount": "0.00",
    "OrderNumber": "0052830095",
    "thirdPartyCart": {
      "monthlyCharges": [
        {
          "itemDescription": "International Calling Blocked",
          "itemRate": "0.0",
          "ProductType": "VOICE"
        },
        {
          "itemRate": "-20.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "AutoPay Discount",
          "itemRate": "-2.5",
          "ProductType": "INTERNET"
        },
        {
          "itemRate": "-10.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "WiFi Gateway",
          "itemRate": "10.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "Paperless Bill Discount",
          "itemRate": "-2.5",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "100 Mbps",
          "itemRate": "50.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "VoIP Unlimited",
          "itemRate": "15.0",
          "ProductType": "VOICE"
        }
      ],
      "oneTimeCharges": [
        {
          "itemDescription": "Fib Int Prof Install",
          "itemRate": "199.0",
          "ProductType": "INTERNET"
        },
        {
          "itemDescription": "Fib Int Prof Inst Waiver",
          "itemRate": "-199.0",
          "ProductType": "INTERNET"
        }
      ]
    }
  },
  "eTag": "20230830T201003.841 GMT"
}

