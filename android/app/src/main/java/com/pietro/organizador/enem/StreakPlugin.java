package com.pietro.organizador.enem;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * StreakPlugin — Plugin Capacitor para salvar/ler dados de streak
 * nas SharedPreferences do Android, permitindo que o widget leia os dados.
 */
@CapacitorPlugin(name = "StreakPlugin")
public class StreakPlugin extends Plugin {

    // Chave das SharedPreferences — deve ser igual à usada no widget
    public static final String PREFS_NAME = "OrganiStudaPrefs";

    // Chaves dos dados
    public static final String KEY_STREAK       = "streak_count";
    public static final String KEY_BEST_STREAK  = "best_streak";
    public static final String KEY_LAST_DATE    = "last_study_date";
    public static final String KEY_TOTAL_Q      = "total_questions";
    public static final String KEY_CORRECT_Q    = "correct_questions";
    public static final String KEY_DARK_MODE    = "dark_mode";

    // ── Salvar dados de streak ─────────────────────────────────────────
    @PluginMethod
    public void saveStreak(PluginCall call) {
        int streak      = call.getInt("streak", 0);
        int bestStreak  = call.getInt("bestStreak", 0);
        String lastDate = call.getString("lastDate", "");
        int totalQ      = call.getInt("totalQuestions", 0);
        int correctQ    = call.getInt("correctQuestions", 0);
        boolean darkMode = call.getBoolean("darkMode", false);

        Context ctx = getContext();
        SharedPreferences prefs = ctx.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();

        editor.putInt(KEY_STREAK,      streak);
        editor.putInt(KEY_BEST_STREAK, bestStreak);
        editor.putString(KEY_LAST_DATE, lastDate);
        editor.putInt(KEY_TOTAL_Q,     totalQ);
        editor.putInt(KEY_CORRECT_Q,   correctQ);
        editor.putBoolean(KEY_DARK_MODE, darkMode);
        editor.apply();

        // Atualizar o widget imediatamente
        StreakWidgetProvider.updateAllWidgets(ctx);

        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    // ── Ler dados de streak ────────────────────────────────────────────
    @PluginMethod
    public void getStreak(PluginCall call) {
        Context ctx = getContext();
        SharedPreferences prefs = ctx.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        JSObject result = new JSObject();
        result.put("streak",           prefs.getInt(KEY_STREAK, 0));
        result.put("bestStreak",       prefs.getInt(KEY_BEST_STREAK, 0));
        result.put("lastDate",         prefs.getString(KEY_LAST_DATE, ""));
        result.put("totalQuestions",   prefs.getInt(KEY_TOTAL_Q, 0));
        result.put("correctQuestions", prefs.getInt(KEY_CORRECT_Q, 0));
        result.put("darkMode",         prefs.getBoolean(KEY_DARK_MODE, false));
        call.resolve(result);
    }
}
