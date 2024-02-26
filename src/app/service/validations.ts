

export function validateEmpty(field: string): boolean {
    if (!field || field.trim() === '') {
      return false; // empty
    }
    return true; // data
  }
  
  export function validatePhone(phone: string): string {
    if (phone && phone.length > 10) {
      return '';
    } else {
      return "The phone number must be less than ten digits";
    }
  }
  
  export function validateEmail(email: string) {
    const formatoCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formatoCorreo.test(email)) {
      return "Enter a valid email";
    } else {
      return "";
    }
  }
  
  export const formValidationVariables = {
    isAddressLineTouched: false,
    isBillingCityTouched: false,
    isStateBillingTouched: false,
    isBillingZipTouched: false,
    isWirelessCarrierTouched: false,
    isWirelessAccountPINTouched: false,
    isIsBillAddSameAsSvcAddTouched: false,
    isAddressForWirelessCarrierTouched: false,
    isNameAsAppearsOnBillTouched: false,
    isContactFirstNameTouched: false,
    isContactLastNameTouched: false,
    isContactPhoneNumberTouched: false,
    isContactPhoneTypeTouched: false,
    isInstallationFirstaNameTouched: false,
    isInstallationLastNameTouched: false,
    isInstallationPhoneTouched: false,
    isInstallationphoneTypeTouched: false,
    isContactEmailTouched: false,
    isInstallationEmailTouched: false,
    isWirelessAccountPINTocuhed: false,
    messageEmail: "",
  
    onAddresLineBlur() {
      formValidationVariables.isAddressLineTouched = true
    },
    onBillingCityBlur() {
      formValidationVariables.isBillingCityTouched = true
    },
  
    onBillingStateBlur() {
      formValidationVariables.isStateBillingTouched = true
    },
    onBillingZipBlur() {
      formValidationVariables.isBillingZipTouched = true
    },
  
    onWirelessCarrierTouched() {
      formValidationVariables.isWirelessCarrierTouched = true
    },
  
    onWirelessAccountPINBlur() {
      formValidationVariables.isWirelessAccountPINTocuhed = true
    },
  
    onNameAsAppearsOnBillBlur() {
      formValidationVariables.isNameAsAppearsOnBillTouched = true;
    },
  
    onAddressForWirelessCarrierBlur() {
      formValidationVariables.isAddressForWirelessCarrierTouched = true;
    },
  
    onIsBillAddSameAsSvcAddBlur() {
      formValidationVariables.isIsBillAddSameAsSvcAddTouched = true;
    }
    ,
    onContactFirstNameBlur() {
      formValidationVariables.isContactFirstNameTouched = true;
    },
  
    onContactLastNameBlur() {
      formValidationVariables.isContactLastNameTouched = true;
    },
  
    onContactPhoneNumberBlur() {
      formValidationVariables.isContactPhoneNumberTouched = true;
    },
  
    onContactPhoneTypeBlur() {
      formValidationVariables.isContactPhoneTypeTouched = true
    },
  
    onInstallationFirstNameBlur() {
      formValidationVariables.isInstallationFirstaNameTouched = true
    },
    onInstallationLastNameBlur() {
      formValidationVariables.isInstallationLastNameTouched = true
    },
    onInstallationPhoneBlur() {
      formValidationVariables.isInstallationPhoneTouched = true
    },
    onInstallationPhoneTypeBlur() {
      formValidationVariables.isInstallationphoneTypeTouched = true
    },
    onContactEmailBlur() {
      formValidationVariables.isContactEmailTouched = true
    },
    onInstallationEmailBlur(){
      this.isInstallationEmailTouched = true
    },
    areAllConditionsValid(earthlinkCoreData: any): boolean {
      return (
        earthlinkCoreData.infoBilling.city != '' &&
        earthlinkCoreData.infoBilling.addressLine1 != '' &&
        earthlinkCoreData.infoBilling.state != '' &&
        earthlinkCoreData.infoBilling.zipCode != '' &&
        earthlinkCoreData.additinalBillingInfo.isWirelessCarrier != '' &&
        earthlinkCoreData.additinalBillingInfo.wirelessAccountPIN != '' &&
        earthlinkCoreData.additinalBillingInfo.nameAsAppearsOnBill != '' &&
        earthlinkCoreData.additinalBillingInfo.addressForWirelessCarrier != '' &&
        earthlinkCoreData.additinalBillingInfo.isBillAddSameAsSvcAdd != '' &&
        earthlinkCoreData.infoContact.firstName != '' &&
        earthlinkCoreData.infoContact.lastName != '' &&
        earthlinkCoreData.infoContact.phoneNumber != '' &&
        earthlinkCoreData.infoContact.phoneType != '' &&
        earthlinkCoreData.infoContact.emailAddress != '' &&
        filterEmail(earthlinkCoreData.infoContact.emailAddress) &&
        earthlinkCoreData.installationContact.firstName != '' &&
        earthlinkCoreData.installationContact.lastName != '' &&
        earthlinkCoreData.installationContact.phoneNumber != '' &&
        earthlinkCoreData.installationContact.phoneType != '' &&
        earthlinkCoreData.installationContact.emailAddress != '' &&
        earthlinkCoreData.portAccount != '' &&
        earthlinkCoreData.portPhoneNumber != '' &&
        earthlinkCoreData.portAccount != '' &&
        earthlinkCoreData.safeGuardDetails.cpniPIN != '' &&
        filterEmail(earthlinkCoreData.installationContact.emailAddress)
      );
    },
  
  };
  export function isValidEmail(email: string): boolean {
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validEmailRegex.test(email);
  }
  
  export function filterEmail(email: string): boolean {
    email = email.toLowerCase();
    const blockedEmailRegex = new RegExp("(.*@isg.*|.*@infinity.*|.*@infinitysales.*|.*@infinitylalesgroup.*|.*noemail@.*|.*na@.*|.*none@.*|.*@noemail.*)", "i");
    return isValidEmail(email) && !blockedEmailRegex.test(email);
  }
  
  
  
  
  
  