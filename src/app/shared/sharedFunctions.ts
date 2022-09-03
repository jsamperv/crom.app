import { environment } from 'src/environments/environment';

export const devlog = (message: string) => {
    if (!environment.production) {
      console.log(message);
    }
};

