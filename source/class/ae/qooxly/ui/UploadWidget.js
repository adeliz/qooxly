/**
 * Upload widget (widget to upload files)
 */
qx.Class.define("ae.qooxly.ui.UploadWidget",
    {
        extend : qx.ui.core.Widget,

        members :
        {
            /**
             * Creates a content element. Overwritten
             * @return {qx.html.Element}
             */
            _createContentElement : function()
            {
                return new qx.html.Element(
                    "input",
                    {
                        overflowX: "hidden",
                        overflowY: "hidden"
                    },
                    {
                        type: "file"
                    }
                );
            },

            /**
             * Get the selected files
             * @return {Array} array of files
             */
            getFiles : function() {
                return this.getContentElement().getDomElement().files;
            }
        }
    });
