from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_routes, name="routes"),
    path("home/", views.get_all_cards_by_last_study, name="home-all-cards"),
    path(
        "home/update/update_app_activity_date/",
        views.update_app_activity_date,
        name="home-all-cards",
    ),
    path(
        "home/last_card_activity_date/",
        views.last_card_activity_date,
        name="last_card_activity_date",
    ),
    path(
        "home/last_app_activity_date/",
        views.last_app_activity_date,
        name="last_app_activity_date",
    ),
    path("vocabcards/", views.get_all_vocabcards, name="all-vocabcards"),
    path("studycards/", views.get_all_studycards, name="all-study-cards"),
    path("vocabcards/create/", views.create_vocabCard, name="create-new-card"),
    path(
        "vocabcard/<str:primary_key>/edit/",
        views.edit_vocab_card,
        name="edit-vocabcard",
    ),
    path(
        "vocabcard/<str:primary_key>/delete/",
        views.delete_vocab_card,
        name="delete-vocabcard",
    ),
    path("vocabcard/<str:primary_key>/", views.get_vocabcard, name="view-vocabcard"),
    path(
        "definition/<str:primary_key>/",
        views.get_definition,
        name="get-jisho-definition",
    ),
]
