import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core";
import { CalendarCellAlignment, CalendarFontStyle, CalendarMonthNamesViewStyle, CalendarMonthViewStyle, CalendarSelectionShape, CalendarWeekViewStyle, CalendarYearViewStyle, CellStyle, DayCellStyle, InlineEventCellStyle, MonthCellStyle } from "nativescript-ui-calendar";

@Injectable()
export class CalendarStyleService {
    private _darkBrownColor = new Color("#5b391e");
    private _lightGrayColor = new Color("#bbcbdb");
    private _preferredFontName = "Times New Roman";

    private zelena = new Color("#48a648");
    private narandzasta = new Color("#e4572e");
    private bela = new Color("#f5f5f5");
    private svetlo_zelena = new Color("#98c498");
    private siva = new Color("#434343");
    private svetlo_siva = new Color("#767676");
    private svetlo_narandzasta = new Color("#e88a6f");

    getMonthViewStyle(): CalendarMonthViewStyle {
        const monthViewStyle = new CalendarMonthViewStyle();
        monthViewStyle.backgroundColor = this.bela;
        // monthViewStyle.showTitle = false;
        monthViewStyle.showWeekNumbers = false;
        // monthViewStyle.showDayNames = false;
        monthViewStyle.selectionShape = CalendarSelectionShape.Round;
        monthViewStyle.selectionShapeSize = 4;
        monthViewStyle.selectionShapeColor = this.siva;

        const todayCellStyle = new DayCellStyle();
        todayCellStyle.cellBackgroundColor = this.zelena;
        todayCellStyle.cellBorderWidth = 2;
        todayCellStyle.cellBorderColor = this.zelena;
        todayCellStyle.cellTextColor = this.siva;
        todayCellStyle.cellTextFontName = this._preferredFontName;
        todayCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
        todayCellStyle.cellTextSize = 14;
        monthViewStyle.todayCellStyle = todayCellStyle;

        const dayCellStyle = new DayCellStyle();
        dayCellStyle.cellBackgroundColor = this.bela;
        dayCellStyle.cellBorderWidth = 1;
        dayCellStyle.cellBorderColor = this.svetlo_zelena;
        dayCellStyle.cellTextColor = this.siva;
        dayCellStyle.cellTextFontName = this._preferredFontName;
        dayCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
        dayCellStyle.cellTextSize = 10;
        //ovo za event ne prihvata
        dayCellStyle.showEventsText = true;
        dayCellStyle.eventTextColor = this.siva;
        dayCellStyle.eventFontName = this._preferredFontName;
        dayCellStyle.eventFontStyle = CalendarFontStyle.BoldItalic;
        dayCellStyle.eventTextSize = 15;
        monthViewStyle.dayCellStyle = dayCellStyle;

        const anotherMonthCellStyle = new DayCellStyle();
        anotherMonthCellStyle.showEventsText = true;
        anotherMonthCellStyle.eventTextColor = this.narandzasta;
        anotherMonthCellStyle.eventFontName = this._preferredFontName;
        anotherMonthCellStyle.eventFontStyle = CalendarFontStyle.BoldItalic;
        anotherMonthCellStyle.eventTextSize = 8;
        anotherMonthCellStyle.cellPaddingHorizontal = 10;
        anotherMonthCellStyle.cellPaddingVertical = 5;
        anotherMonthCellStyle.cellBackgroundColor = this.narandzasta;
        anotherMonthCellStyle.cellBorderWidth = 1;
        anotherMonthCellStyle.cellBorderColor = this.svetlo_siva;
        anotherMonthCellStyle.cellTextColor = this._darkBrownColor;
        anotherMonthCellStyle.cellTextFontName = this._preferredFontName;
        anotherMonthCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
        anotherMonthCellStyle.cellTextSize = 10;
        monthViewStyle.anotherMonthCellStyle = anotherMonthCellStyle;


        const disabledCellStyle = new DayCellStyle();
        disabledCellStyle.showEventsText = true;
        disabledCellStyle.eventTextColor = this._lightGrayColor;
        disabledCellStyle.eventFontName = this._preferredFontName;
        disabledCellStyle.eventFontStyle = CalendarFontStyle.BoldItalic;
        disabledCellStyle.eventTextSize = 8;
        disabledCellStyle.cellPaddingHorizontal = 10;
        disabledCellStyle.cellPaddingVertical = 5;
        disabledCellStyle.cellBackgroundColor = this._lightGrayColor;
        disabledCellStyle.cellBorderWidth = 1;
        disabledCellStyle.cellBorderColor = this.svetlo_zelena;
        disabledCellStyle.cellTextColor = this._darkBrownColor;
        disabledCellStyle.cellTextFontName = this._preferredFontName;
        disabledCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
        disabledCellStyle.cellTextSize = 10;
        monthViewStyle.disabledCellStyle = disabledCellStyle;

        // const vikend = new DayCellStyle();
        // vikend.eventTextColor = this._blueVioletColor;
        // vikend.eventFontName = this._preferredFontName;
        // vikend.eventFontStyle = CalendarFontStyle.BoldItalic;
        // vikend.eventTextSize = 8;
        // vikend.cellPaddingHorizontal = 10;
        // vikend.cellPaddingVertical = 5;
        // vikend.cellBackgroundColor = this.svetlo_zelena;
        // vikend.cellBorderWidth = 1;
        // vikend.cellBorderColor = this.svetlo_zelena;
        // vikend.cellTextColor = this._brownColor;
        // vikend.cellTextFontName = this._preferredFontName;
        // vikend.cellTextFontStyle = CalendarFontStyle.Bold;
        // vikend.cellTextSize = 12;
        // monthViewStyle.weekendCellStyle = vikend;

        const izabranDan = new DayCellStyle();
        izabranDan.eventTextColor = this.siva;
        izabranDan.eventFontName = this._preferredFontName;
        izabranDan.eventTextSize = 10;
        izabranDan.cellBackgroundColor = this.svetlo_zelena;
        izabranDan.cellBorderWidth = 2;
        izabranDan.cellBorderColor = this.siva;
        izabranDan.cellTextColor = this.siva;
        izabranDan.cellTextFontName = this._preferredFontName;
        izabranDan.cellTextFontStyle = CalendarFontStyle.Bold;
        izabranDan.cellTextSize = 18;
        monthViewStyle.selectedDayCellStyle = izabranDan;

        const nazivDanaUNedelji = new CellStyle();
        nazivDanaUNedelji.cellBackgroundColor = this.zelena;
        nazivDanaUNedelji.cellBorderWidth = 1;
        nazivDanaUNedelji.cellBorderColor = this.svetlo_zelena;
        nazivDanaUNedelji.cellTextColor = this.bela;
        nazivDanaUNedelji.cellTextFontName = this._preferredFontName;
        nazivDanaUNedelji.cellTextFontStyle = CalendarFontStyle.Bold;
        nazivDanaUNedelji.cellTextSize = 12;
        monthViewStyle.dayNameCellStyle = nazivDanaUNedelji;

        const nazivMeseca = new DayCellStyle();
        nazivMeseca.cellBackgroundColor = this.zelena;
        nazivMeseca.cellBorderWidth = 10;
        nazivMeseca.cellBorderColor = this.zelena;
        nazivMeseca.cellTextColor = this.bela;
        nazivMeseca.cellTextFontName = this._preferredFontName;
        nazivMeseca.cellTextFontStyle = CalendarFontStyle.Bold;
        nazivMeseca.cellTextSize = 18;
        monthViewStyle.titleCellStyle = nazivMeseca;

        const inlineEventCellStyle = new InlineEventCellStyle();
        inlineEventCellStyle.cellBackgroundColor = this.svetlo_zelena;
        inlineEventCellStyle.eventTextColor = this.siva;
        inlineEventCellStyle.eventFontName = this._preferredFontName;
        inlineEventCellStyle.eventFontStyle = CalendarFontStyle.Bold;
        monthViewStyle.inlineEventCellStyle = inlineEventCellStyle;

        return monthViewStyle;
    }

    // getWeekViewStyle(): CalendarWeekViewStyle {
    //     const weekViewStyle = new CalendarWeekViewStyle();
    //     weekViewStyle.backgroundColor = this._orangeColor;
    //     weekViewStyle.showTitle = true;
    //     weekViewStyle.showWeekNumbers = true;
    //     weekViewStyle.showDayNames = true;

    //     const todayCellStyle = new DayCellStyle();
    //     todayCellStyle.cellBackgroundColor = this._orangeColor;
    //     todayCellStyle.cellBorderWidth = 1;
    //     todayCellStyle.cellBorderColor = this._lightYellowColor;
    //     todayCellStyle.cellTextColor = this._brownColor;
    //     todayCellStyle.cellTextFontName = this._preferredFontName;
    //     todayCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     todayCellStyle.cellTextSize = 14;
    //     weekViewStyle.todayCellStyle = todayCellStyle;

    //     const dayCellStyle = new DayCellStyle();
    //     dayCellStyle.showEventsText = true;
    //     dayCellStyle.eventTextColor = this._whiteColor;
    //     dayCellStyle.eventFontName = this._preferredFontName;
    //     dayCellStyle.eventFontStyle = CalendarFontStyle.BoldItalic;
    //     dayCellStyle.eventTextSize = 8;
    //     dayCellStyle.cellAlignment = CalendarCellAlignment.VerticalCenter;
    //     dayCellStyle.cellPaddingHorizontal = 10;
    //     dayCellStyle.cellPaddingVertical = 5;
    //     dayCellStyle.cellBackgroundColor = this._lightGreenColor;
    //     dayCellStyle.cellBorderWidth = 1;
    //     dayCellStyle.cellBorderColor = this._lightYellowColor;
    //     dayCellStyle.cellTextColor = this._brownColor;
    //     dayCellStyle.cellTextFontName = this._preferredFontName;
    //     dayCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     dayCellStyle.cellTextSize = 10;
    //     weekViewStyle.dayCellStyle = dayCellStyle;

    //     const weekendCellStyle = new DayCellStyle();
    //     weekendCellStyle.eventTextColor = this._blueVioletColor;
    //     weekendCellStyle.eventFontName = this._preferredFontName;
    //     weekendCellStyle.eventFontStyle = CalendarFontStyle.BoldItalic;
    //     weekendCellStyle.eventTextSize = 8;
    //     weekendCellStyle.cellAlignment = CalendarCellAlignment.VerticalCenter;
    //     weekendCellStyle.cellPaddingHorizontal = 10;
    //     weekendCellStyle.cellPaddingVertical = 5;
    //     weekendCellStyle.cellBackgroundColor = this._lightYellowColor;
    //     weekendCellStyle.cellBorderWidth = 1;
    //     weekendCellStyle.cellBorderColor = this._lightYellowColor;
    //     weekendCellStyle.cellTextColor = this._brownColor;
    //     weekendCellStyle.cellTextFontName = this._preferredFontName;
    //     weekendCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     weekendCellStyle.cellTextSize = 12;
    //     weekViewStyle.weekendCellStyle = weekendCellStyle;

    //     const selectedCellStyle = new DayCellStyle();
    //     selectedCellStyle.eventTextColor = this._blueColor;
    //     selectedCellStyle.eventFontName = this._preferredFontName;
    //     selectedCellStyle.eventFontStyle = CalendarFontStyle.Bold;
    //     selectedCellStyle.eventTextSize = 8;
    //     selectedCellStyle.cellAlignment = CalendarCellAlignment.VerticalCenter;
    //     selectedCellStyle.cellPaddingHorizontal = 10;
    //     selectedCellStyle.cellPaddingVertical = 5;
    //     selectedCellStyle.cellBackgroundColor = this._brownColor;
    //     selectedCellStyle.cellBorderWidth = 2;
    //     selectedCellStyle.cellBorderColor = this._lightYellowColor;
    //     selectedCellStyle.cellTextColor = this._blackColor;
    //     selectedCellStyle.cellTextFontName = this._preferredFontName;
    //     selectedCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     selectedCellStyle.cellTextSize = 18;
    //     weekViewStyle.selectedDayCellStyle = selectedCellStyle;

    //     const weekNumberCellStyle = new CellStyle();
    //     weekNumberCellStyle.cellBackgroundColor = this._lightGrayColor;
    //     weekNumberCellStyle.cellBorderWidth = 2;
    //     weekNumberCellStyle.cellBorderColor = this._brownColor;
    //     weekNumberCellStyle.cellTextColor = this._brownColor;
    //     weekNumberCellStyle.cellTextFontName = this._preferredFontName;
    //     weekNumberCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     weekNumberCellStyle.cellTextSize = 8;
    //     weekViewStyle.weekNumberCellStyle = weekNumberCellStyle;

    //     const dayNameCellStyle = new CellStyle();
    //     dayNameCellStyle.cellBackgroundColor = this._lightGrayColor;
    //     dayNameCellStyle.cellBorderWidth = 1;
    //     dayNameCellStyle.cellBorderColor = this._lightYellowColor;
    //     dayNameCellStyle.cellTextColor = this._brownColor;
    //     dayNameCellStyle.cellTextFontName = this._preferredFontName;
    //     dayNameCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     dayNameCellStyle.cellTextSize = 10;
    //     weekViewStyle.dayNameCellStyle = dayNameCellStyle;

    //     const titleCellStyle = new DayCellStyle();
    //     titleCellStyle.cellBackgroundColor = this._orangeColor;
    //     titleCellStyle.cellBorderWidth = 1;
    //     titleCellStyle.cellBorderColor = this._lightYellowColor;
    //     titleCellStyle.cellTextColor = this._brownColor;
    //     titleCellStyle.cellTextFontName = this._preferredFontName;
    //     titleCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
    //     titleCellStyle.cellTextSize = 18;
    //     weekViewStyle.titleCellStyle = titleCellStyle;

    //     return weekViewStyle;
    // }

//     getMonthNamesViewStyle(): CalendarMonthNamesViewStyle {
//         const monthNamesViewStyle = new CalendarMonthNamesViewStyle();

//         const titleCellStyle = new DayCellStyle();
//         titleCellStyle.cellBackgroundColor = this._orangeColor;
//         titleCellStyle.cellBorderWidth = 2;
//         titleCellStyle.cellBorderColor = this._lightYellowColor;
//         titleCellStyle.cellTextColor = this._brownColor;
//         titleCellStyle.cellTextFontName = this._preferredFontName;
//         titleCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
//         titleCellStyle.cellTextSize = 18;
//         monthNamesViewStyle.titleCellStyle = titleCellStyle;

//         const monthNameCellStyle = new CellStyle();
//         monthNameCellStyle.cellBackgroundColor = this._lightGreenColor;
//         monthNameCellStyle.cellBorderWidth = 2;
//         monthNameCellStyle.cellBorderColor = this._lightYellowColor;
//         monthNameCellStyle.cellTextColor = this._brownColor;
//         monthNameCellStyle.cellTextFontName = this._preferredFontName;
//         monthNameCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
//         monthNameCellStyle.cellTextSize = 20;
//         monthNamesViewStyle.monthNameCellStyle = monthNameCellStyle;

//         return monthNamesViewStyle;
//     }

    getYearViewStyle(): CalendarYearViewStyle {
        const yearViewStyle = new CalendarYearViewStyle();

        const titleCellStyle = new DayCellStyle();
        // titleCellStyle.cellBackgroundColor = this._orangeColor;
        // titleCellStyle.cellBorderWidth = 1;
        // titleCellStyle.cellBorderColor = this._lightYellowColor;
        titleCellStyle.cellTextColor = this.zelena;
        titleCellStyle.cellTextFontName = this._preferredFontName;
        titleCellStyle.cellTextFontStyle = CalendarFontStyle.Bold;
        titleCellStyle.cellTextSize = 18;
        yearViewStyle.titleCellStyle = titleCellStyle;

        const monthCellStyle = new MonthCellStyle();
        monthCellStyle.weekendTextColor = this.svetlo_siva;
        monthCellStyle.todayTextColor = this.siva;
        monthCellStyle.dayTextColor = this.bela;
        monthCellStyle.dayFontName = this._preferredFontName;
        monthCellStyle.dayFontStyle = CalendarFontStyle.Bold;
        monthCellStyle.dayTextSize = 12;
        monthCellStyle.dayNameTextColor = this.zelena;
        monthCellStyle.dayNameFontName = this._preferredFontName;
        monthCellStyle.dayNameFontStyle = CalendarFontStyle.Bold;
        monthCellStyle.dayNameTextSize = 14;
        monthCellStyle.monthNameTextColor = this.zelena;
        monthCellStyle.monthNameFontName = this._preferredFontName;
        monthCellStyle.monthNameFontStyle = CalendarFontStyle.Bold;
        monthCellStyle.monthNameTextSize = 15;
        monthCellStyle.effectivePaddingRight = 5;
        monthCellStyle._defaultPaddingRight = 5;
        yearViewStyle.monthCellStyle = monthCellStyle;

        return yearViewStyle;
    }


}
