// types/react-gtm-module.d.ts
declare module 'react-gtm-module' {
    const TagManager: {
      initialize: (config: { gtmId: string }) => void;
    };
    export default TagManager;
  }
  