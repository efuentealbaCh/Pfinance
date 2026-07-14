<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class WebPushNotification extends Notification
{
    use Queueable;

    public $title;
    public $message;
    public $icon;
    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct($title, $message, $icon = null, $url = '/')
    {
        $this->title = $title;
        $this->message = $message;
        $this->icon = $icon ?? '/pwa-192x192.png';
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [WebPushChannel::class];
    }

    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title($this->title)
            ->icon($this->icon)
            ->body($this->message)
            ->action('Ver', 'view_action')
            ->data(['url' => $this->url]);
    }
}
