interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  }
}
export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: '308jr9jrc49jr349j9c34jr934jr934j5c',
        user: {
          name: 'Carlos',
          email: 'carlosandre1572@gmail.com' 
        }
      })
    }, 2000);
  })
}