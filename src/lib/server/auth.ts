const CHEF_USER_ID = process.env.CHEF_USER_ID;

export function isChef(userID: string) {
  return userID === CHEF_USER_ID;
}
