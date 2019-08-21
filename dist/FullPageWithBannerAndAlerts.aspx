<%@ Page Language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>

<%@ Register TagPrefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SPSWC" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration
		name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>"
		runat="server" />
	<PublishingWebControls:EditModePanel PageDisplayMode="Edit" runat="server">
		<SharePointWebControls:CssRegistration
			name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>"
			runat="server" />
	</PublishingWebControls:EditModePanel>
	<SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server" />
	<PublishingWebControls:EditModePanel PageDisplayMode="Display" runat="server">
		<link href=/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/css/banner.css rel=preload as=style>
		<link href=/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/js/banner.js rel=preload as=script>
		<link href=/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/css/banner.css rel=stylesheet>
	</PublishingWebControls:EditModePanel>

</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server" />
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderMain" runat="server">
	<div id="HiddenSearch">
		<div class="row">
			<WebPartPages:WebPartZone runat="server" Title="Search" ID="WPZSearch">
				<ZoneTemplate></ZoneTemplate>
			</WebPartPages:WebPartZone>
		</div>
	</div>
	<div id="SearchBanner"></div>
	<div id="MainAlerts" class="container">
		<div id="Alerts" class="row"></div>
	</div>
	<div id="MainContent" class="container">
		<div class="row">
			<WebPartPages:WebPartZone runat="server" Title="Main" ID="WPZMain">
				<ZoneTemplate></ZoneTemplate>
			</WebPartPages:WebPartZone>
		</div>
	</div>
	<script src=/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/js/banner.js> </script> </asp:Content>