import { Colors } from '@src/Constants/Colors';
import {
  BadgeAlert,
  BadgeCheck,
  BadgeInfo,
} from 'lucide-react-native';
import { toast } from 'sonner-native';

const showSuccessToast = (message: string) => {
  toast.success(message, {
    styles: {
      toast: { backgroundColor: Colors.green['500'] },
      toastContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      description: {
        color: Colors.base['600'],
      },
      title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 14,
        color: Colors.base['600'],
      },
    },
    dismissible: true,
    icon: <BadgeCheck size={18} color={Colors.base['700']} strokeWidth={2} />,
  });
};

const showErrorToast = (message: string) => {
  toast.error(message, {
    styles: {
      toast: { backgroundColor: Colors['brick-red']['500'] },
      toastContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      description: {
        color: Colors.base['700'],
      },
      title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 14,
        color: Colors.base['700'],
      },
    },

    dismissible: true,
    icon: <BadgeAlert size={18} color={Colors.base['700']} strokeWidth={2} />,
  });
};

const showInfoToast = (message: string) => {
  toast.info(message, {
    styles: {
      toast: { backgroundColor: Colors['base']['50'] },
      toastContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      description: {
        color: Colors.base['700'],
      },
      title: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 14,
        color: Colors.base['700'],
      },
    },
    dismissible: true,
    icon: <BadgeInfo size={18} color={Colors.base['700']} strokeWidth={2} />,
  });
};

export { showSuccessToast, showErrorToast, showInfoToast };
