<?php

namespace App;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    /**
     * The constant that are available for the type field
     *
     * @var array
     */
    public static $type_hardware = 'HARDWARE';
    public static $type_mobile = 'MOBILE';

    /**
     * The attributes of the model that can be freely edited
     *
     * @var array
     */
    protected $fillable = [
        'data',
        'type'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'data' => 'array',
    ];

    /**
     * Retrieve the deployment associated with this interaction
     *
     * @return App\Deployment
     */
    public function deployment()
    {
        return $this->belongsTo(Deployment::class);
    }

    /**
     * Map a model's class to a type for the interaction
     *
     * @param any $model
     * @return string
     */
    public static function mapClassToType($model)
    {
        if ($model instanceof MobileDevice) {
            return Interaction::$type_mobile;
        } else if ($model instanceof HardwareDevice) {
            return Interaction::$type_hardware;
        }
        
        throw new Exception ('Authenticated device cannot be mapped to interaction type');
    }
}
