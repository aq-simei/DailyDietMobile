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
    source?: 'overview' | 'newMeal' | 'editMeal' | 'auth';
    refreshData?: boolean;
  };
  Overview: undefined;
  NewMeal: undefined;
  EditMeal: { mealId: string };
  DeleteMeal: {
    mealId: string;
    mealName: string;
  };
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
