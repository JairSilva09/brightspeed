import { CarriersList, InfoBilling, PotentialDates, ProductInternet, ProductVoice, Products, SecurityQuestionsList, SelectedIsgRewards, ShowingCart } from "./models";

export interface ORDERDATA {
    isDevMode: boolean;
    agentId: string;
    additinalBillingInfo: {
      isWirelessCarrier: string;
      wirelessAccountPIN: string;
      nameAsAppearsOnBill: string;
      addressForWirelessCarrier: string;
      isBillAddSameAsSvcAdd: string;
    };
    addressLine1: string;
    addressLine2: string;
    appointment: {
      appointmentWindowId: string;
      date: string;
      startTime: string;
      endTime: string;
    };
    assignNewNumber: string;
    carriersList: CarriersList[];
    caseId: string;
    controlNumber: number;
    infoContact: { firstName: string,
      lastName: string,
      phoneNumber: string,
      phoneType: string,
      emailAddress: string
     };
    dnis: string;
    email: string;
    ifMatch: string;
    isgGiftCard: string;
    isgGiftCardResponse: boolean;
    firstName: string;
    lastName: string;
    market: string;
    phone: string;
    infoBilling: InfoBilling;
    installationContact: {
      firstName: string,
      lastName: string,
      phoneNumber: string,
      phoneType: string,
      emailAddress: string,
      specialInstruction: string
    };
    portability: boolean;
    portPhoneNumber: string;
    portAccount: string;
    portCarrierName: string;
    potentialDates: PotentialDates[];
    productType: string | null;
    products: Products;
    secondaryPhone: string;
    selectedIsgRewards: {
      value: number;
    };
    serviceCity: string;
    serviceState: string;
    serviceZip: string;
    transactionId: string;
    salesConsumer: string;
    safeGuardDetails: {
      cpniPIN: string,
      id: string,
      question: string,
      answer: string,
     };
    securityQuestionsList: SecurityQuestionsList[];
    showingCart: {
      productInternet: {
        planName: string;
        recurringAmount: string;
      };
      productVoice: ProductVoice;
    };
  }

export const orderData: ORDERDATA = {
    isDevMode: true,
    agentId: "",
    addressLine1: "",
    addressLine2: "",
    additinalBillingInfo: {
      isWirelessCarrier: "",
      wirelessAccountPIN: "",
      nameAsAppearsOnBill: "",
      addressForWirelessCarrier: "",
      isBillAddSameAsSvcAdd: "",
    },
    appointment: {
      appointmentWindowId: "",
      date: "",
      startTime: "",
      endTime: "",
    },
    assignNewNumber: "",
    caseId: "",
    carriersList: [
      {
        name: "",
      },
    ],
    infoContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      phoneType: "",
      emailAddress: ""
    },
    installationContact: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      phoneType: "",
      emailAddress: "",
      specialInstruction: ""
     },
    controlNumber: 0,
    dnis: "",
    email: "",
    ifMatch: "",
    infoBilling: {
      addressLine1: "",
      addressLine2: "",
      attentionInCareOf: "",
      city: "",
      state: "",
      zipCode:  "",
    },
    firstName: "",
    isgGiftCard: "",
    isgGiftCardResponse: false,
    lastName: "",
    market: "",
    phone: "",
    portability: false,
    portPhoneNumber: "",
    portAccount: "",
    portCarrierName: "",
    potentialDates:[],
    products: {
      internetPlans: [],
      voicePlans: [],
    },
    productType: null,
    salesConsumer: "",
    selectedIsgRewards: {
      value: 0,
    },
    secondaryPhone: "",
    serviceCity: "",
    serviceState: "",
    serviceZip: "",
    transactionId: "",
    safeGuardDetails: {
      cpniPIN: "",
      id: "",
      question: "",
      answer: "",
    },
    securityQuestionsList: [],
    showingCart: {
      productInternet:{
        planName: "",
        recurringAmount: "",
      },
      productVoice:{
        planName: "",
      },
         
    }
};
  
