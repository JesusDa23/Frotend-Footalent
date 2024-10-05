import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmincheckService } from '../../../../../Services/admincheck.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bullet } from '../../../../models/bullet.model';

@Component({
  selector: 'app-listbullets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listbullets.component.html',
  styleUrl: './listbullets.component.css'
})
export class ListbulletsComponent {
  private lastScrollTop = 0;
  bullets: Bullet [] = [];
  sectionId!: string;
  errorMessage: string | null = null;
  showNewBulletInput: boolean = false;
  showBottomBar: boolean = true;
 
  
  newBulletDescription: string = '';
  showDeleteButtons: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private admincheckService: AdmincheckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sectionId = this.route.snapshot.paramMap.get('sectionId')!;
    this.loadBullets(this.sectionId);
  }

  loadBullets(sectionId: string): void {
    this.admincheckService.getBulletsBySection(sectionId).subscribe(
      (data: Bullet[]) => {
        this.bullets = data;
        console.log('Bullets:', this.bullets);
      },
      (error) => {
        console.error('Error retrieving bullets:', error);
        this.errorMessage = 'Error loading bullets';
      }
    );
  }

  createBullet(): void {
    if (this.newBulletDescription.trim()) {
      const newBullet = { description: this.newBulletDescription, requerido: false, sectionId: this.sectionId };
      this.admincheckService.createBullet(newBullet).subscribe(
        (createdBullet: Bullet) => {
          this.bullets.push(createdBullet);
          this.newBulletDescription = ''; // Clear the input field
        },
        (error) => {
          console.error('Error creating bullet:', error);
        }
      );
    }
  }

   // Toggle the visibility of delete buttons
  toggleDeleteButtons(): void {
    this.showDeleteButtons = !this.showDeleteButtons;
  }

  toggleRequerido(bullet: Bullet): void {
    // Flip the 'requerido' status
    const updatedRequerido = !bullet.requerido;
    
    this.admincheckService.updateRequerido(bullet._id!, updatedRequerido).subscribe(
      (updatedBullet) => {
        bullet.requerido = updatedBullet.requerido;
        console.log('Bullet updated:', updatedBullet);
      },
      (error) => {
        console.error('Error updating requerido status:', error);
      }
    );
  }

  deleteBullet(bulletId: string): void {
    this.admincheckService.deleteBullet(bulletId).subscribe(
      () => {
        this.bullets = this.bullets.filter(bullet => bullet._id !== bulletId); // Remove from list
      },
      (error) => {
        console.error('Error deleting bullet:', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const bottomBar = document.getElementById('bottom-bar');

    if (bottomBar) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        bottomBar.classList.remove('translate-y-0');
        bottomBar.classList.add('translate-y-full');
      } else {
        // Scrolling up
        bottomBar.classList.remove('translate-y-full');
        bottomBar.classList.add('translate-y-0');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }
  goBack() {
    this.router.navigate(['..']); // Navigate back in history
  }
  


}

