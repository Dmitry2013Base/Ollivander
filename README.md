# Ollivander

Для запуска выполняем:
```
cd Ollivander/Deploy
docker compose up --build
```

Теперь по адресу http://localhost:5000 попадаем на главную страницу

## Описание
Ollivander - интернет-магазин волшебных палочек и др. волшебных предметов из вселенной Гарри Поттера. Поскольку, все товары - волшебные, то для покупки нужна волшебная банковская карточка, если такой карты нет, то при оплате можно вводить любые данные (номер карты, месяц, год и код с обратной стороны) - данные карты не проверяются, **если ввести данные реальной карты деньги не спишутся!!!**

## Стек технологий:
- Backend:
    - Микросервисы ASP.NET Core .NET 6.0 (Api Gateway - ocelot, Авторизация с помощью JWT),
    - СУБД PostgreSQL
- Frontend:
    - React-Redux

## Пользователи и роли по умолчанию

1. Роль Guest
    - Логин: Guest 
    - Пароль: Guest 
    - Возможности: покупка товаров, добавление товаров в корзину и избранное, просмотр своих заказов, возможность изменить свой пароль

2. Роль Manager
    - Логин: Manager
    - Пароль: Manager
    - Возможности: аналогичные пользователям с роль Guest + управление всеми заказами

3. Роль Analyst
    - Логин: Analyst
    - Пароль: Analyst
    - Возможности: аналогичные пользователям с роль Guest + просмотр статистики

4. Роль Admin
    - Логин: Admin 
    - Пароль: Admin 
    - Возможности: аналогичные пользователям с ролями Guest + Manager + Analyst + управление пользователями + созданние/изменение/удаление товаров
  
## Регистрация
Требования:
- Уникальный логин, 5+ символов
- Пароль - 5+ символов

ps: По умолчанию всем пользователям добавляется роль Guest
  
## Управление пользователями
Для управления ролями используется Drag’n’Drop. На странице /dev имеются 3 скрытые кнопки, которые видимы только, когда начинаешь перетаскивать роль.

Чтобы добавить/убрать/удалить роль нужно:
1. Выбрать пользователя (ЛКМ), в таблице с ролями выделятся роли, которые есть у выбранного пользователя
2. Начать перетаскивать роль, на экране станут видимыми кнопки: 
    - плюсик - добавляет роль
    - минус - убирает роль
    - корзина - удаляет роль из бд
3. Отпустить роль над одной из этих кнопок
  
