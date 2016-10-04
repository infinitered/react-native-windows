using System;
using System.Collections.Generic;
using System.Text;
#if WINDOWS_UWP
using Windows.Foundation.Diagnostics;

namespace ReactNative.Tracing
{
    class ReactNativeLoggingChannel 
    {
        public ReactNativeLoggingChannel(string name, LoggingChannelOptions options)
        {
            this._instance = new LoggingChannel(name, options);
        }
        public bool Enabled
        {
            get { return this._instance.Enabled;}
        }

        public LoggingChannel _instance { get; set;  }

        public void LogEvent(String channel, LoggingFields fields, ReactNativeLoggingLevel level)
        {
            LoggingLevel translated = (LoggingLevel) ((int) level);
            this._instance.LogEvent(channel, fields, translated);
        }

        public void LogEvent(String channel, LoggingFields fields, ReactNativeLoggingLevel level, LoggingOptions options)
        {
            LoggingLevel translated = (LoggingLevel)((int)level);
            this._instance.LogEvent(channel, fields, translated, options);
        }
    }
}
#else
namespace ReactNative.Tracing
{
    class ReactNativeLoggingChannel
    {
        
    }
}
#endif