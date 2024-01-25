# selecting the whole sheet

```
' dung de filter theo ky han
With ActiveSheet.PivotTables("PivotTable3").PivotFields("Ma DVKD (sau ra soat)")
    .Orientation = xlPageField
    .Position = 1
End With

ActiveSheet.PivotTables("PivotTable3").AddDataField ActiveSheet.PivotTables( _
    "PivotTable3").PivotFields("So du (quy doi)"), "Count of So du (quy doi)", _
    xlCount
With ActiveSheet.PivotTables("PivotTable3").PivotFields( _
    "Count of So du (quy doi)")
    .Caption = "Sum of So du (quy doi)"
    .Function = xlSum
End With

' dung de un-check all checkboxes
With ActiveSheet.PivotTables("PivotTable3").PivotFields("Ma DVKD (sau ra soat)")
    For i = 1 To .PivotItems.Count - 1
        .PivotItems(.PivotItems(i).Name).Visible = False
    Next i
    .PivotItems("94234").Visible = True
End With
```

## `ActiveSheet.Cells.Select`

```visual-basic
Sub RunAllPhongBan()
    Sheets("MacroPhongBan").UsedRange.ClearContents

    MacroPhongBanDuNo.Step1PivotPhongBan

    Sheets("PhongBan").Activate
    Range("A1").Select

End Sub
Sub RunAllPhongBanHuyDong()
    Sheets("MacroPhongBanHuyDong").UsedRange.ClearContents

    MacroPhongBanHuyDong.MacroPhongBanHuyDong

    Sheets("PhongBan").Activate
    Range("A47").Select


End Sub

Sub RunAllCanBo()
    Sheets("MacroCanBo").UsedRange.ClearContents

    MacroCanBoDuNo.Step1PivotCanBo

    Sheets("CanBo").Activate
    Range("A1").Select

End Sub

Sub RunAllCanBoHuyDong()
    Sheets("MacroCanBoHuyDong").UsedRange.ClearContents

    MacroCanBoHuyDong.MacroCanBoHuyDong

    Sheets("CanBo").Activate
    Range("A42").Select

End Sub
```

---

# tips for working with excel 😊 


