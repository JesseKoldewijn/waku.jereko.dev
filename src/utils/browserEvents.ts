"use client";

import { use, useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter_UNSTABLE as useRouter } from "waku";

// This is a global variable to keep track of the view transition state.
let currentViewTransition:
  | null
  | [
      // Promise to wait for the view transition to start
      Promise<void>,
      // Resolver to finish the view transition
      () => void,
    ] = null;

export function useBrowserNativeTransitions() {
  const { path: pathname } = useRouter();
  const currentPathname = useRef(pathname);

  const transition = useSyncExternalStore(
    (callback: () => void) => {
      if (!("startViewTransition" in document)) {
        return () => {};
      }

      const onPopState = () => {
        let pendingViewTransitionResolve: () => void;

        const pendingViewTransition = new Promise<void>((resolve) => {
          pendingViewTransitionResolve = resolve;
        });

        const pendingStartViewTransition = new Promise<void>((resolve) => {
          // @ts-ignore
          document.startViewTransition(() => {
            resolve();
            return pendingViewTransition;
          });
        });

        currentViewTransition = [
          pendingStartViewTransition,
          pendingViewTransitionResolve!,
        ];

        callback();
      };
      window.addEventListener("popstate", onPopState);

      return () => {
        // TODO: Intentionally not cleaning up the event listener, otherwise the
        // listener won't be registered again. This might be something related
        // to the `use` call. Should be investigated further.
      };
    },
    () => currentViewTransition,
    () => null,
  );

  if (transition && currentPathname.current !== pathname) {
    // Whenever the pathname changes, we block the rendering of the new route
    // until the view transition is started (i.e. DOM screenshotted).
    use(transition[0]);
  }

  // Keep the transition reference up-to-date.
  const transitionRef = useRef(transition);
  useEffect(() => {
    transitionRef.current = transition;
  }, [transition]);

  useEffect(() => {
    // When the new route component is actually mounted, we finish the view
    // transition.
    currentPathname.current = pathname;
    if (transitionRef.current) {
      transitionRef.current[1]();
      transitionRef.current = null;
    }
  }, [pathname]);
}
