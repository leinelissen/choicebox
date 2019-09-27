<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    /**
     * The constant that are available for the type field
     *
     * @var array
     */
    public $types = [
        'hardware' => 'TYPE_HARDWARE',
        'mobile' => 'TYPE_MOBILE',
    ];

    /**
     * The attributes of the model that can be freely edited
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'data'
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
}
