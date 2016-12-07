using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;
using RNDeviceInfo;

namespace Playground.Net46
{
    internal class AppReactPage : ReactPage
    {
        public override string MainComponentName => "Playground.Net46";

        public override string JavaScriptMainModuleName => "ReactWindows/Playground.Net46/index.windows";

#if BUNDLE
        public override string JavaScriptBundleFile
        {
            get
            {
                return "ms-appx:///ReactAssets/index.windows.bundle";
            }
        }
#endif

        public override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new RNDeviceInfoPackage(),
        };

        public override bool UseDeveloperSupport
        {
            get
            {
#if !BUNDLE || DEBUG
                return true;
#else
                return false;
#endif
            }
        }
    }
}
