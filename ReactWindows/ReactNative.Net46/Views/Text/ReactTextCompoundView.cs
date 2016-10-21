using ReactNative.UIManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace ReactNative.Views.Text
{
    class ReactTextCompoundView : IReactCompoundView
    {
        public int GetReactTagAtPoint(UIElement reactView, Point point)
        {
            var richTextBlock = reactView.As<RichTextBox>();
            var textPointer = richTextBlock.GetPositionFromPoint(point, true);
            return textPointer.Parent.GetTag();
        }
    }
}
