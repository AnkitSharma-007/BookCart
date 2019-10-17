import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { SiteTheme } from 'src/app/models/customtheme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit {

  currentTheme;

  themes: SiteTheme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'deeppurple-amber',
      isDark: false
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      name: 'pink-bluegrey',
      isDark: true
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      name: 'purple-green',
      isDark: true
    }
  ];

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
    this.installTheme('indigo-pink');
  }

  installTheme(themeName: string) {
    this.currentTheme = this.themes.find(x => x.name === themeName);
    if (!this.currentTheme) {
      return;
    }

    if (this.currentTheme.isDefault) {
      this.themeService.removeStyle('theme');
    } else {
      this.themeService.setStyle(
        'theme',
        `/assets/${this.currentTheme.name}.css`
      );
    }
  }
}
