import * as Yup from 'yup'; 

    export class UserProfileComponentData {
      constructor(
        readonly nickName: string[]
      ) {
        this.nickName = nickName
      }

      static empty(profile?: any): UserDetailsData {
        return new UserDetailsData(
          profile?.nickName ?? ''
        );
      }
    }

    export const validationSchema = (i18n: any) => {
      return Yup.object().shape({
        
        nickName: Yup.string()
          .trim()
          .required(' is required')
          
      });
    };