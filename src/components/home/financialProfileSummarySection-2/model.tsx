import * as Yup from 'yup'; 

    export class FinancialProfileComponentData {
      constructor(
        readonly totalBalance: string[],
    readonly totalAvailableBalance: string[]
      ) {
        this.totalBalance = totalBalance;
    this.totalAvailableBalance = totalAvailableBalance
      }

      static empty(profile?: any): UserDetailsData {
        return new UserDetailsData(
          profile?.totalBalance ?? '',
      profile?.totalAvailableBalance ?? ''
        );
      }
    }

    export const validationSchema = (i18n: any) => {
      return Yup.object().shape({
        
        totalBalance: Yup.string()
          .trim()
          .required('Total Available is required')
          ,

        totalAvailableBalance: Yup.string()
          .trim()
          .required('Available balance is required')
          
      });
    };