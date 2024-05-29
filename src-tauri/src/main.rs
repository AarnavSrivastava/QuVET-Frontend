#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// #[tauri::command]
// fn println_term(message: &str) {
//   println!("{}", message);
// }

use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let save = CustomMenuItem::new("save".to_string(), "Save");
  let submenu_file = Submenu::new("File", Menu::new().add_item(quit).add_item(save));

  let run = CustomMenuItem::new("run".to_string(), "Run");
  let clear = CustomMenuItem::new("clear".to_string(), "Clear");
  let submenu_circuit = Submenu::new("Circuit", Menu::new().add_item(run).add_item(clear));

  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu_file)
    .add_submenu(submenu_circuit);

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
        "run" => {
          event.window().emit_all("run", ()).unwrap();
        }
        "clear" => {
          event.window().emit_all("clear", ()).unwrap();
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}