#pragma strict
import GameObjectExtension;
public class GuiEventReceiver extends GuiEventSender {

	private var context:RectTransform;
	private var cam:Camera;
	private var canvas:Canvas;
	private var position0: int = -83; //Position eingefahrener Menüs
	private var position1: int = 190; //Position ausgefahrener Menüs
	private var clickCount: int = 0; //Zählt mit, ob ein Element das erste oder zweite Mal geklickt wurde
	private var schublade = new Array();
	
	private var bGMenue: GameObject;	
	private var bPMenue: GameObject;	
	private var comMenue: GameObject;	
	private var surMenue: GameObject;	
	private var attMenue: GameObject;	
	private var editMenue: GameObject;

	function Start() {
		//Variablen der Schubladen werden gefüllt und der Reihenfolge nach in den Array "schublade" eingesetzt
		bGMenue = GameObject.Find("backgroundButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(bGMenue, "Assets/GuiEventReceiver.js(31,17)", "GameObjectExtensions");
		schublade.Push(bGMenue); //0
		bPMenue = GameObject.Find("basePlateButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(bPMenue, "Assets/GuiEventReceiver.js(34,17)", "GameObjectExtensions");
		schublade.Push(bPMenue); //1
		comMenue = GameObject.Find("componentButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(comMenue, "Assets/GuiEventReceiver.js(37,17)", "GameObjectExtensions");
		schublade.Push(comMenue); //2
		surMenue = GameObject.Find("surfaceButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(surMenue, "Assets/GuiEventReceiver.js(40,17)", "GameObjectExtensions");
		schublade.Push(surMenue); //3
		attMenue = GameObject.Find("attachmentButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(attMenue, "Assets/GuiEventReceiver.js(43,17)", "GameObjectExtensions");
		schublade.Push(attMenue); //4
		editMenue = GameObject.Find("editButton");
		UnityEngineInternal.APIUpdaterRuntimeServices.AddComponent(editMenue, "Assets/GuiEventReceiver.js(46,17)", "GameObjectExtensions");
		schublade.Push(editMenue); //5
	
		//var es:EventSystems.EventSystem = EventSystems.EventSystem.current;
		context = this.transform.Find("Context") as RectTransform;
		canvas = this.GetComponent(Canvas);
		cam = canvas.worldCamera;
		//Debug.Log("Context: " + context);
	}
	
	function Update() {
		moveContext();
		Debug.Log(clickCount);
	}
	
	function onGuiEvent(_eventData: EventSystems.PointerEventData) {
		var isVisible = _eventData.selectedObject.GetComponent(typeof GameObjectExtension).IsVisible;
		/*var dump:String = "Event Data | ";
		dump += "pointerId: " + _eventData.pointerId + " | ";
		dump += "Visible: " + isVisible + " | ";
		dump += "selectedObject: " +  _eventData.selectedObject + " | ";
		dump += "pointerEnter: " +  _eventData.pointerEnter + " | ";
		dump += "pointerPress: " +  _eventData.pointerPress + " | ";
		dump += "rawPointerPress: " +  _eventData.rawPointerPress + " | ";
		dump += "pressPosition: " +  _eventData.pressPosition + " | ";
		//dump += "worldPosition: " +  _eventData.worldPosition + " | ";
		dump += "clickCount: " +  _eventData.clickCount + " | ";
		dump += "clickTime: " +  _eventData.clickTime + "";
		Debug.Log(dump);
		context.Find("Text").GetComponent(UI.Text).text = dump; */
		var pointer:GameObject = _eventData.selectedObject;
		Debug.Log(pointer);
		
		if(isVisible) {
			Debug.Log("Component is visible, toggling invisible");
			closeDrawers();
		}
		else {
		Debug.Log("Component is not visible, toggling visible");
			openDrawer(pointer);
		}
	}
	
	function openDrawer(object:GameObject) {
		closeDrawers();
		Debug.Log("Ich will diesen Button öffnen");
		object.transform.position.x = position1;
		object.GetComponent(typeof GameObjectExtension).IsVisible = true;		
	}
	
	function closeDrawers() {
		Debug.Log("Ich will alle Buttons schließen");
		for(var a=0;a<schublade.length; a++) {
			
			var drawer:GameObject = schublade[a];
			
			if (drawer.transform.position.x == position1) {	
				drawer.transform.position.x = position0; 
				drawer.GetComponent(typeof GameObjectExtension).IsVisible = false;
			}
		}
	} 

	function moveContext() {
		
		var pos:Vector3 = Input.mousePosition + Vector3(10,10,0);

		switch (canvas.renderMode) {
			case RenderMode.ScreenSpaceOverlay:
				context.transform.position = pos;
				break;
			case RenderMode.ScreenSpaceCamera:
				// if using a camera-space canvas
				var wpos:Vector3 = cam.ScreenToWorldPoint(pos + Vector3(0,0,canvas.planeDistance));
				context.transform.position = wpos;
				break;
		}
		//Debug.Log(context.transform.position + " - " + wpos);
	}
}
