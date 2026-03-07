package com.pietro.organizador.enem;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.widget.RemoteViews;

/**
 * StreakWidgetProvider — Widget nativo Android para a tela inicial.
 *
 * Exibe:
 *   🔥 Sequência de estudos
 *   X dias consecutivos
 *   Recorde: Y dias
 *   Questões: Z (W% de acerto)
 *
 * Detecta automaticamente o tema do sistema (dark/light).
 * Lê dados das SharedPreferences salvas pelo StreakPlugin.
 */
public class StreakWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int widgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, widgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        // Atualizar ao receber broadcast de atualização
        if (AppWidgetManager.ACTION_APPWIDGET_UPDATE.equals(intent.getAction())) {
            AppWidgetManager manager = AppWidgetManager.getInstance(context);
            int[] ids = manager.getAppWidgetIds(
                new ComponentName(context, StreakWidgetProvider.class)
            );
            onUpdate(context, manager, ids);
        }
    }

    // ── Atualizar um widget específico ─────────────────────────────────
    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        // Ler dados das SharedPreferences
        SharedPreferences prefs = context.getSharedPreferences(
            StreakPlugin.PREFS_NAME, Context.MODE_PRIVATE
        );

        int streak      = prefs.getInt(StreakPlugin.KEY_STREAK, 0);
        int bestStreak  = prefs.getInt(StreakPlugin.KEY_BEST_STREAK, 0);
        int totalQ      = prefs.getInt(StreakPlugin.KEY_TOTAL_Q, 0);
        int correctQ    = prefs.getInt(StreakPlugin.KEY_CORRECT_Q, 0);
        boolean darkModePref = prefs.getBoolean(StreakPlugin.KEY_DARK_MODE, false);

        // Detectar tema do sistema
        int nightMode = context.getResources().getConfiguration().uiMode
                        & Configuration.UI_MODE_NIGHT_MASK;
        boolean isDark = darkModePref
                         || (nightMode == Configuration.UI_MODE_NIGHT_YES);

        // Escolher layout baseado no tema
        int layoutId = isDark
            ? R.layout.widget_streak_dark
            : R.layout.widget_streak_light;

        RemoteViews views = new RemoteViews(context.getPackageName(), layoutId);

        // ── Streak principal ──────────────────────────────────────────
        String streakText = streak + (streak == 1 ? " dia" : " dias");
        views.setTextViewText(R.id.widget_streak_count, streakText);

        // ── Emoji de fogo baseado no streak ──────────────────────────
        String fireEmoji = getFireEmoji(streak);
        views.setTextViewText(R.id.widget_fire_emoji, fireEmoji);

        // ── Recorde ───────────────────────────────────────────────────
        views.setTextViewText(R.id.widget_best_streak,
            "Recorde: " + bestStreak + (bestStreak == 1 ? " dia" : " dias"));

        // ── Questões ──────────────────────────────────────────────────
        int accuracy = totalQ > 0 ? (int) ((correctQ * 100.0) / totalQ) : 0;
        views.setTextViewText(R.id.widget_questions,
            totalQ + " questões · " + accuracy + "% acerto");

        // ── Mensagem motivacional ─────────────────────────────────────
        views.setTextViewText(R.id.widget_motivation, getMotivation(streak));

        // ── Clique abre o app ─────────────────────────────────────────
        Intent launchIntent = context.getPackageManager()
            .getLaunchIntentForPackage(context.getPackageName());
        if (launchIntent != null) {
            PendingIntent pendingIntent = PendingIntent.getActivity(
                context, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);
        }

        manager.updateAppWidget(widgetId, views);
    }

    // ── Atualizar todos os widgets (chamado pelo StreakPlugin) ─────────
    public static void updateAllWidgets(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(
            new ComponentName(context, StreakWidgetProvider.class)
        );
        if (ids != null && ids.length > 0) {
            AppWidgetProvider provider = new StreakWidgetProvider();
            provider.onUpdate(context, manager, ids);
        }
    }

    // ── Emoji de fogo baseado no streak ───────────────────────────────
    private static String getFireEmoji(int streak) {
        if (streak == 0)  return "📚";
        if (streak < 3)   return "🔥";
        if (streak < 7)   return "🔥🔥";
        if (streak < 14)  return "🔥🔥🔥";
        if (streak < 30)  return "⚡🔥";
        if (streak < 100) return "💥🔥";
        return "🏆🔥";
    }

    // ── Mensagem motivacional ─────────────────────────────────────────
    private static String getMotivation(int streak) {
        if (streak == 0)  return "Comece hoje!";
        if (streak == 1)  return "Ótimo começo!";
        if (streak < 3)   return "Continue assim!";
        if (streak < 7)   return "Você está indo bem!";
        if (streak < 14)  return "Uma semana! Incrível!";
        if (streak < 30)  return "Duas semanas! 🎯";
        if (streak < 100) return "Um mês de dedicação! 🏅";
        return "Lendário! 🏆";
    }
}
