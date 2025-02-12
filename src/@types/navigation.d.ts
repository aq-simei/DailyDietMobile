declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}

type HomeStackParamList = {
  Home: undefined;
  Overview: undefined;
  NewMeal: undefined;
};
