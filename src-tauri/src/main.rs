#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// #[tauri::command]
// fn println_term(message: &str) {
//   println!("{}", message);
// }

use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let save = CustomMenuItem::new("save".to_string(), "Save");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(save));
  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu);

  tauri::Builder::default()
    // .invoke_handler(tauri::generate_handler![println_term])
    .plugin(tauri_plugin_store::Builder::default().build())
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "quit" => {
          event.window().close().unwrap();
        }
        "save" => {
          event.window().emit_all("save", ()).unwrap();
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}