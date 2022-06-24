import moment from "moment";
import libPhoneNumber from "google-libphonenumber";
import {getHtmlTextLength} from "./utils";
import {FormControl, ValidatorFn} from "./types";

const phoneUtils = libPhoneNumber.PhoneNumberUtil.getInstance();

export type ValidatorTemplateFn = (...props) => ValidatorFn;

export const Validators = {
  required: (field = 'This field') => ({ value }: FormControl) => {
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length))
      return `${field} is required.`;
    return null;
  },
  email: (field = 'This field') => ({ value }: FormControl) => {
    if (!/^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/.test(value))
      return `${field} should be valid email.`;
    return null;
  },
  url: (field = 'This field') => ({ value }: FormControl) => {
    if (value && !/^http(s?):\/\//gi.test(value))
      return `${field} should be valid url.`;
    return null;
  },
  phone: (region?: string, field = 'This field') => ({ value }: FormControl) => {
    if (!value)
      return null;

    try {
      const phoneNumber = phoneUtils.parse(value);
      if (phoneNumber && phoneUtils.isPossibleNumber(phoneNumber))
        return null;
    } catch {}

    // let phoneNumber;
    // try {
    //   phoneNumber = phoneUtils.parse(`+${value}`);
    // } catch {}
    //
    // if (phoneNumber && phoneUtils.isPossibleNumber(phoneNumber))
    //   return null;
    //
    // if (region) {
    //   try {
    //     phoneNumber = phoneUtils.parse(`+${region} ${value}`);
    //   } catch {}
    //   if (phoneNumber && phoneUtils.isPossibleNumber(phoneNumber))
    //     return null;
    // }
    return `${field} should be valid phone number.`;
  },
  pattern: (regexp, field = 'This field') => ({ value }: FormControl) => {
    if (value && !regexp.test(value))
      return `${field} should be valid format.`;
    return null;
  },
  pastTime: (compareTime = null, message = null, field = 'This field') => ({ value }: FormControl) => {
    if (!compareTime)
      compareTime = new Date();
    if (!message)
      message = 'should be past datetime.';
    if (value && !moment(value).isBefore(moment(compareTime)))
      return `${field} ${message}`;
    return null;
  },
  maxLength: (maxLen, html = false, field = 'This field') => ({ value }: FormControl) => {
    if (!value)
      return;
    const textLen = html ? getHtmlTextLength(value) : value.length;
    if (textLen > maxLen)
      return `${field} should be at most ${maxLen} characters.`;
    return null;
  },
};
