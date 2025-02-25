declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}

type AppStackParamList = {
  App: undefined;
  Auth: undefined;
};

type HomeStackParamList = {
  Home: {
    source: "overview" | "newMeal" | "editMeal" | "auth";
  };
  Overview: undefined;
  NewMeal: undefined;
  EditMeal: { mealId: string };
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
