import React from "react";
import './Details.css';
import product from './/example_products_photo/1.webp';

export default function Details() {
	return(
		<div className="container">
			<h1 className="header">Товар "N"</h1>
			<div className="details">
				<div className="pictures">
					<img className="image" src={product} alt="product"></img>
				</div>
				<div className="text_right">
					<div className="full_name">Полное наименование товара Полное наименование товара Полное наименование товара Полное наименование товара Полное наименование </div>
					<div className="top_buttons">
						<div className="compare">Сравнить</div>
						<div className="rating">Рейтинг</div>
						<div className="comments"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat"/></div>
						<div className="reliability">Надёжность</div>
						<div className="share"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/share-2.png" alt="share"/></div>
					</div>
					<div className="mid_buttons">
						<div className="price">100 ₽</div>
						<div className="fav"><img className="icons_0" width="40" height="40" src="https://img.icons8.com/windows/64/like--v1.png" alt="Fav"/></div>
						<div className="buy"><strong>Купить</strong></div>
					</div>
				</div>
			</div>
			<div className="page_bottom">
				<div className="side_buttons">
					<div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/settings--v1.png" alt="Characteristics"/>Характеристики</div>
					<div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/star--v1.png" alt="Rating"/>Отзывы</div>
					<div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat"/>Коммуникатор</div>
					<div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-reliability-customer-services-help-support-smashingstocks-mixed-smashing-stocks.png" alt="Reliability"/>Надёжность</div>
					<div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-files-files-those-icons-lineal-those-icons.png" alt="Files"/>Инструкции и файлы</div>
				</div>
				<div className="characteristics">
					<div className="chars_title">Характеристики товара N</div>
					<div className="chars_content">
						<div className="char_title">Заводские данные</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char_title">Операционная система</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char_title">Экран</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char_title">Процессор</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
						<div className="char">
							<div className="char_name">Char</div>
							<div className="char_value">Value</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}