#pragma strict
public class GuiEventSender extends EventSystems.UIBehaviour implements EventSystems.IPointerClickHandler {
   
	function OnPointerClick(_eventData: EventSystems.PointerEventData) {
		Debug.Log("Click");
		if(_eventData.selectedObject != null) {
			SendMessageUpwards("onGuiEvent", _eventData);
		}
		else {
			SendMessageUpwards("closeDrawers");
		}
	}
}