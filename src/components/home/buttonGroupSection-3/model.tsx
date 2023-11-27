import * as Yup from 'yup'; 

    export class themeComponentData {
      constructor(
        readonly transfer: string[],
    readonly rewards: string[],
    readonly islamic: string[],
    readonly bills: string[]
      ) {
        this.transfer = transfer;
    this.rewards = rewards;
    this.islamic = islamic;
    this.bills = bills
      }

      static empty(profile?: any): UserDetailsData {
        return new UserDetailsData(
          profile?.transfer ?? '',
      profile?.rewards ?? '',
      profile?.islamic ?? '',
      profile?.bills ?? ''
        );
      }
    }

    export const validationSchema = (i18n: any) => {
      return Yup.object().shape({
        
        transfer: Yup.string()
          .trim()
          .required('Transfer is required')
          ,

        rewards: Yup.string()
          .trim()
          .required('Rewards is required')
          ,

        islamic: Yup.string()
          .trim()
          .required('Islamic is required')
          ,

        bills: Yup.string()
          .trim()
          .required('Bills is required')
          
      });
    };