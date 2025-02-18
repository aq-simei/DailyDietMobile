jest.mock('axios', () => {
  return {
    create: jest.fn(() => {
      return {
        get: jest.fn(() => {}),
        post: jest.fn(() => {}),
        put: jest.fn(() => {}),
        delete: jest.fn(() => {}),
        interceptors: {
          request: { use: jest.fn(), eject: jest.fn() },
          response: { use: jest.fn(), eject: jest.fn() },
        },
      };
    }),
  };
});

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-gesture-handler', () => {
  return {
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    PanGestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    ForceTouchGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    NativeViewGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
    /* and other gesture handlers if needed */
    GestureHandlerRootView: jest.fn(),
    Directions: {},
  };
});
