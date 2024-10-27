import { EventArg, NavigationAction } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useBackHandler(fn: () => void, triggerFn: boolean) {

  useEffect(() => {
    const backListner = BackHandler.addEventListener('hardwareBackPress', () => {
      fn();
      return triggerFn
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;

      /**
      * Returning false will let the event to bubble up & let other event listeners
      * or the system's default back action to be executed.
      */
      return false;

    })
    return backListner.remove
  }, [fn])

}